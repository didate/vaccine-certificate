import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlainte, Plainte } from 'app/shared/model/plainte.model';
import { PlainteService } from './plainte.service';
import { PlainteComponent } from './plainte.component';
import { PlainteDetailComponent } from './plainte-detail.component';
import { PlainteUpdateComponent } from './plainte-update.component';

@Injectable({ providedIn: 'root' })
export class PlainteResolve implements Resolve<IPlainte> {
  constructor(private service: PlainteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlainte> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((plainte: HttpResponse<Plainte>) => {
          if (plainte.body) {
            return of(plainte.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Plainte());
  }
}

export const plainteRoute: Routes = [
  {
    path: '',
    component: PlainteComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Plaintes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlainteDetailComponent,
    resolve: {
      plainte: PlainteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Plaintes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlainteUpdateComponent,
    resolve: {
      plainte: PlainteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Plaintes',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlainteUpdateComponent,
    resolve: {
      plainte: PlainteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Plaintes',
    },
    canActivate: [UserRouteAccessService],
  },
];
