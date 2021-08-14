import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGeneration, Generation } from 'app/shared/model/generation.model';
import { GenerationService } from './generation.service';
import { GenerationComponent } from './generation.component';
import { GenerationDetailComponent } from './generation-detail.component';
import { GenerationUpdateComponent } from './generation-update.component';

@Injectable({ providedIn: 'root' })
export class GenerationResolve implements Resolve<IGeneration> {
  constructor(private service: GenerationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGeneration> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((generation: HttpResponse<Generation>) => {
          if (generation.body) {
            return of(generation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Generation());
  }
}

export const generationRoute: Routes = [
  {
    path: '',
    component: GenerationComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Generations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenerationDetailComponent,
    resolve: {
      generation: GenerationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Generations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenerationUpdateComponent,
    resolve: {
      generation: GenerationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Generations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenerationUpdateComponent,
    resolve: {
      generation: GenerationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Generations',
    },
    canActivate: [UserRouteAccessService],
  },
];
