import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITrackerEntityInstance, TrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { TrackerEntityInstanceService } from './tracker-entity-instance.service';
import { TrackerEntityInstanceComponent } from './tracker-entity-instance.component';
import { TrackerEntityInstanceDetailComponent } from './tracker-entity-instance-detail.component';
import { TrackerEntityInstanceUpdateComponent } from './tracker-entity-instance-update.component';

@Injectable({ providedIn: 'root' })
export class TrackerEntityInstanceResolve implements Resolve<ITrackerEntityInstance> {
  constructor(private service: TrackerEntityInstanceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrackerEntityInstance> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((trackerEntityInstance: HttpResponse<TrackerEntityInstance>) => {
          if (trackerEntityInstance.body) {
            return of(trackerEntityInstance.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TrackerEntityInstance());
  }
}

export const trackerEntityInstanceRoute: Routes = [
  {
    path: '',
    component: TrackerEntityInstanceComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'TrackerEntityInstances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrackerEntityInstanceDetailComponent,
    resolve: {
      trackerEntityInstance: TrackerEntityInstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TrackerEntityInstances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrackerEntityInstanceUpdateComponent,
    resolve: {
      trackerEntityInstance: TrackerEntityInstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TrackerEntityInstances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrackerEntityInstanceUpdateComponent,
    resolve: {
      trackerEntityInstance: TrackerEntityInstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TrackerEntityInstances',
    },
    canActivate: [UserRouteAccessService],
  },
];
