import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrackerEntityInstance, TrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TrackerEntityInstanceService } from './tracker-entity-instance.service';
import { TrackerEntityInstanceDeleteDialogComponent } from './tracker-entity-instance-delete-dialog.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'jhi-tracker-entity-instance',
  templateUrl: './tracker-entity-instance.component.html',
})
export class TrackerEntityInstanceComponent implements OnInit, OnDestroy {
  trackerEntityInstances?: ITrackerEntityInstance[];
  trackerEntityInstance?: ITrackerEntityInstance;
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  searchlink: string[] = [];
  link = '';
  isLoading = true;
  isLoadingErase = false;
  isFilterShow = false;
  filterIcon = 'angle-double-down';

  editForm = this.fb.group({
    id: [],
    uid: [null],
    nom: [null],
    prenom: [null],
    sexe: [null],
    profession: [null],
    age: [null],
    region: [null],
    prefecture: [null],
    sousPrefecture: [],
    quartier: [null],
    village: [],
    telephone: [null],
    localId: [null],
    code: [],
    certificate: [],
  });

  constructor(
    protected trackerEntityInstanceService: TrackerEntityInstanceService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.trackerEntityInstanceService
      .query('', {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
      })
      .subscribe(
        (res: HttpResponse<ITrackerEntityInstance[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInTrackerEntityInstances();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITrackerEntityInstance): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTrackerEntityInstances(): void {
    this.eventSubscriber = this.eventManager.subscribe('trackerEntityInstanceListModification', () => this.loadPage());
  }

  delete(trackerEntityInstance: ITrackerEntityInstance): void {
    const modalRef = this.modalService.open(TrackerEntityInstanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.trackerEntityInstance = trackerEntityInstance;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ITrackerEntityInstance[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/tracker-entity-instance'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.trackerEntityInstances = data || [];
    this.ngbPaginationPage = this.page;

    this.isLoading = false;
    this.isLoadingErase = false;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;

    this.isLoading = false;
    this.isLoadingErase = false;
  }

  search(): void {
    this.isLoading = true;
    this.link = '';
    this.searchlink = [];
    this.trackerEntityInstance = this.createFromForm();

    //this.sessionStorage.store('filter', this.operationAgence);

    if (this.trackerEntityInstance.uid) {
      this.searchlink.push(`uid:${this.trackerEntityInstance.uid}`);
    }
    if (this.trackerEntityInstance.localId) {
      this.searchlink.push(`localId:*${this.trackerEntityInstance.localId}*`);
    }
    if (this.trackerEntityInstance.code) {
      this.searchlink.push(`code:${this.trackerEntityInstance.code}`);
    }
    if (this.trackerEntityInstance.nom) {
      this.searchlink.push(`nom:*${this.trackerEntityInstance.nom}*`);
    }
    if (this.trackerEntityInstance.prenom) {
      this.searchlink.push(`prenom:*${this.trackerEntityInstance.prenom}*`);
    }
    if (this.trackerEntityInstance.sexe) {
      this.searchlink.push(`sexe:${this.trackerEntityInstance.sexe}`);
    }
    if (this.trackerEntityInstance.prefecture) {
      this.searchlink.push(`prefecture:${this.trackerEntityInstance.prefecture}`);
    }
    if (this.trackerEntityInstance.profession) {
      this.searchlink.push(`profession:${this.trackerEntityInstance.profession}`);
    }
    if (this.trackerEntityInstance.telephone) {
      this.searchlink.push(`telephone:*${this.trackerEntityInstance.telephone}*`);
    }

    this.link = this.searchlink.join(',');

    this.trackerEntityInstanceService
      .query(this.link, {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ITrackerEntityInstance[]>) => this.onSuccess(res.body, res.headers, 1, false),
        (res: HttpResponse<any>) => this.onError()
      );
  }
  eraseFilter(): void {
    this.isLoadingErase = true;
    this.page = 0;
    this.link = '';
    this.searchlink = [];
    this.resetForm();
    this.search();
  }

  filterStatus(): void {
    this.isFilterShow = !this.isFilterShow;
    this.filterIcon = this.filterIcon === 'angle-double-down' ? 'angle-double-up' : 'angle-double-down';
  }

  private createFromForm(): ITrackerEntityInstance {
    return {
      ...new TrackerEntityInstance(),
      uid: this.editForm.get(['uid'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      profession: this.editForm.get(['profession'])!.value,
      age: this.editForm.get(['age'])!.value,
      prefecture: this.editForm.get(['prefecture'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      localId: this.editForm.get(['localId'])!.value,
      code: this.editForm.get(['code'])!.value,
    };
  }

  resetForm(): void {
    this.editForm.patchValue({
      uid: '',
      nom: '',
      prenom: '',
      sexe: '',
      profession: '',
      age: '',
      prefecture: '',
      telephone: '',
      localId: '',
      code: '',
    });
  }
}
