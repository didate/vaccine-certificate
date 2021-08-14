import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEvent, Event } from 'app/shared/model/event.model';
import { EventService } from './event.service';
import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { TrackerEntityInstanceService } from 'app/entities/tracker-entity-instance/tracker-entity-instance.service';

@Component({
  selector: 'jhi-event-update',
  templateUrl: './event-update.component.html',
})
export class EventUpdateComponent implements OnInit {
  isSaving = false;
  trackerentityinstances: ITrackerEntityInstance[] = [];
  dateVaccinationDp: any;

  editForm = this.fb.group({
    id: [],
    uid: [null, [Validators.required]],
    dateVaccination: [null, [Validators.required]],
    siteVaccination: [null, [Validators.required]],
    typeVaccin: [null, [Validators.required]],
    lot: [null, [Validators.required]],
    dose: [null, [Validators.required]],
    tei: [null, Validators.required],
  });

  constructor(
    protected eventService: EventService,
    protected trackerEntityInstanceService: TrackerEntityInstanceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ event }) => {
      this.updateForm(event);

      this.trackerEntityInstanceService
        .query()
        .subscribe((res: HttpResponse<ITrackerEntityInstance[]>) => (this.trackerentityinstances = res.body || []));
    });
  }

  updateForm(event: IEvent): void {
    this.editForm.patchValue({
      id: event.id,
      uid: event.uid,
      dateVaccination: event.dateVaccination,
      siteVaccination: event.siteVaccination,
      typeVaccin: event.typeVaccin,
      lot: event.lot,
      dose: event.dose,
      tei: event.tei,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const event = this.createFromForm();
    if (event.id !== undefined) {
      this.subscribeToSaveResponse(this.eventService.update(event));
    } else {
      this.subscribeToSaveResponse(this.eventService.create(event));
    }
  }

  private createFromForm(): IEvent {
    return {
      ...new Event(),
      id: this.editForm.get(['id'])!.value,
      uid: this.editForm.get(['uid'])!.value,
      dateVaccination: this.editForm.get(['dateVaccination'])!.value,
      siteVaccination: this.editForm.get(['siteVaccination'])!.value,
      typeVaccin: this.editForm.get(['typeVaccin'])!.value,
      lot: this.editForm.get(['lot'])!.value,
      dose: this.editForm.get(['dose'])!.value,
      tei: this.editForm.get(['tei'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITrackerEntityInstance): any {
    return item.id;
  }
}
