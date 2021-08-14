import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlainte } from 'app/shared/model/plainte.model';

type EntityResponseType = HttpResponse<IPlainte>;
type EntityArrayResponseType = HttpResponse<IPlainte[]>;

@Injectable({ providedIn: 'root' })
export class PlainteService {
  public resourceUrl = SERVER_API_URL + 'api/plaintes';

  constructor(protected http: HttpClient) {}

  create(plainte: IPlainte): Observable<EntityResponseType> {
    return this.http.post<IPlainte>(this.resourceUrl, plainte, { observe: 'response' });
  }

  update(plainte: IPlainte): Observable<EntityResponseType> {
    return this.http.put<IPlainte>(this.resourceUrl, plainte, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlainte>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlainte[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
