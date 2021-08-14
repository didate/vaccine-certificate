import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPlainte, Plainte } from 'app/shared/model/plainte.model';
import { PlainteService } from './plainte.service';

@Component({
  selector: 'jhi-plainte-update',
  templateUrl: './plainte-update.component.html',
})
export class PlainteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    telephone: [],
    localId: [],
    code: [],
    commentaire: [null, [Validators.required]],
  });

  constructor(protected plainteService: PlainteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ plainte }) => {
      this.updateForm(plainte);
    });
  }

  updateForm(plainte: IPlainte): void {
    this.editForm.patchValue({
      id: plainte.id,
      telephone: plainte.telephone,
      localId: plainte.localId,
      code: plainte.code,
      commentaire: plainte.commentaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const plainte = this.createFromForm();
    if (plainte.id !== undefined) {
      this.subscribeToSaveResponse(this.plainteService.update(plainte));
    } else {
      this.subscribeToSaveResponse(this.plainteService.create(plainte));
    }
  }

  private createFromForm(): IPlainte {
    return {
      ...new Plainte(),
      id: this.editForm.get(['id'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      localId: this.editForm.get(['localId'])!.value,
      code: this.editForm.get(['code'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlainte>>): void {
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
