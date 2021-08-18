import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { FormBuilder } from '@angular/forms';
import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { TrackerEntityInstanceService } from 'app/entities/tracker-entity-instance/tracker-entity-instance.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  trackerEntityInstances?: ITrackerEntityInstance[];

  searchlink: string[] = [];
  link = '';
  isLoading = true;
  isLoadingErase = false;
  isFilterShow = false;
  filterIcon = 'angle-double-down';

  editForm = this.fb.group({
    criteria: [null],
  });

  constructor(
    private trackerEntityInstanceService: TrackerEntityInstanceService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  search(): void {
    this.isLoading = true;
    this.link = '';
    this.searchlink = [];
    const criteria = this.editForm.get(['criteria'])!.value;

    if (criteria) {
      console.log(this.trackerEntityInstanceService);
      this.trackerEntityInstanceService.frontSearch(criteria).subscribe(
        (res: HttpResponse<ITrackerEntityInstance[]>) => (this.trackerEntityInstances = res.body || []),
        (res: HttpResponse<any>) => console.log(res)
      );
    }
  }

  private createFromForm(): any {
    return {
      criteria: this.editForm.get(['criteria'])!.value,
    };
  }

  trackId(index: number, item: ITrackerEntityInstance): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
}
