import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';

type EntityResponseType = HttpResponse<ITrackerEntityInstance>;
type EntityArrayResponseType = HttpResponse<ITrackerEntityInstance[]>;

@Injectable({ providedIn: 'root' })
export class TrackerEntityInstanceService {
  public resourceUrl = SERVER_API_URL + 'api/tracker-entity-instances';

  constructor(protected http: HttpClient) {}

  create(trackerEntityInstance: ITrackerEntityInstance): Observable<EntityResponseType> {
    return this.http.post<ITrackerEntityInstance>(this.resourceUrl, trackerEntityInstance, { observe: 'response' });
  }

  update(trackerEntityInstance: ITrackerEntityInstance): Observable<EntityResponseType> {
    return this.http.put<ITrackerEntityInstance>(this.resourceUrl, trackerEntityInstance, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrackerEntityInstance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrackerEntityInstance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
