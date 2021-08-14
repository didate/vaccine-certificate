import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITrackerEntityInstance, TrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { TrackerEntityInstanceService } from './tracker-entity-instance.service';

@Component({
  selector: 'jhi-tracker-entity-instance-update',
  templateUrl: './tracker-entity-instance-update.component.html',
})
export class TrackerEntityInstanceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    uid: [null, [Validators.required]],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    sexe: [null, [Validators.required]],
    profession: [null, [Validators.required]],
    age: [null, [Validators.required]],
    region: [null, [Validators.required]],
    prefecture: [null, [Validators.required]],
    sousPrefecture: [],
    quartier: [null, [Validators.required]],
    village: [],
    telephone: [null, [Validators.required]],
    localId: [null, [Validators.required]],
    code: [],
    certificate: [],
  });

  constructor(
    protected trackerEntityInstanceService: TrackerEntityInstanceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trackerEntityInstance }) => {
      this.updateForm(trackerEntityInstance);
    });
  }

  updateForm(trackerEntityInstance: ITrackerEntityInstance): void {
    this.editForm.patchValue({
      id: trackerEntityInstance.id,
      uid: trackerEntityInstance.uid,
      nom: trackerEntityInstance.nom,
      prenom: trackerEntityInstance.prenom,
      sexe: trackerEntityInstance.sexe,
      profession: trackerEntityInstance.profession,
      age: trackerEntityInstance.age,
      region: trackerEntityInstance.region,
      prefecture: trackerEntityInstance.prefecture,
      sousPrefecture: trackerEntityInstance.sousPrefecture,
      quartier: trackerEntityInstance.quartier,
      village: trackerEntityInstance.village,
      telephone: trackerEntityInstance.telephone,
      localId: trackerEntityInstance.localId,
      code: trackerEntityInstance.code,
      certificate: trackerEntityInstance.certificate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trackerEntityInstance = this.createFromForm();
    if (trackerEntityInstance.id !== undefined) {
      this.subscribeToSaveResponse(this.trackerEntityInstanceService.update(trackerEntityInstance));
    } else {
      this.subscribeToSaveResponse(this.trackerEntityInstanceService.create(trackerEntityInstance));
    }
  }

  private createFromForm(): ITrackerEntityInstance {
    return {
      ...new TrackerEntityInstance(),
      id: this.editForm.get(['id'])!.value,
      uid: this.editForm.get(['uid'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      profession: this.editForm.get(['profession'])!.value,
      age: this.editForm.get(['age'])!.value,
      region: this.editForm.get(['region'])!.value,
      prefecture: this.editForm.get(['prefecture'])!.value,
      sousPrefecture: this.editForm.get(['sousPrefecture'])!.value,
      quartier: this.editForm.get(['quartier'])!.value,
      village: this.editForm.get(['village'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      localId: this.editForm.get(['localId'])!.value,
      code: this.editForm.get(['code'])!.value,
      certificate: this.editForm.get(['certificate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrackerEntityInstance>>): void {
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
}
