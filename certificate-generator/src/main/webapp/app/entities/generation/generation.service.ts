import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGeneration } from 'app/shared/model/generation.model';

type EntityResponseType = HttpResponse<IGeneration>;
type EntityArrayResponseType = HttpResponse<IGeneration[]>;

@Injectable({ providedIn: 'root' })
export class GenerationService {
  public resourceUrl = SERVER_API_URL + 'api/generations';

  constructor(protected http: HttpClient) {}

  create(generation: IGeneration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(generation);
    return this.http
      .post<IGeneration>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(generation: IGeneration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(generation);
    return this.http
      .put<IGeneration>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGeneration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGeneration[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(generation: IGeneration): IGeneration {
    const copy: IGeneration = Object.assign({}, generation, {
      dateGeneration:
        generation.dateGeneration && generation.dateGeneration.isValid() ? generation.dateGeneration.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateGeneration = res.body.dateGeneration ? moment(res.body.dateGeneration) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((generation: IGeneration) => {
        generation.dateGeneration = generation.dateGeneration ? moment(generation.dateGeneration) : undefined;
      });
    }
    return res;
  }
}
