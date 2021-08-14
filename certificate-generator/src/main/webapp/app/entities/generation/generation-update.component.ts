import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGeneration, Generation } from 'app/shared/model/generation.model';
import { GenerationService } from './generation.service';

@Component({
  selector: 'jhi-generation-update',
  templateUrl: './generation-update.component.html',
})
export class GenerationUpdateComponent implements OnInit {
  isSaving = false;
  dateGenerationDp: any;

  editForm = this.fb.group({
    id: [],
    dateGeneration: [null, [Validators.required]],
  });

  constructor(protected generationService: GenerationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ generation }) => {
      this.updateForm(generation);
    });
  }

  updateForm(generation: IGeneration): void {
    this.editForm.patchValue({
      id: generation.id,
      dateGeneration: generation.dateGeneration,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const generation = this.createFromForm();
    if (generation.id !== undefined) {
      this.subscribeToSaveResponse(this.generationService.update(generation));
    } else {
      this.subscribeToSaveResponse(this.generationService.create(generation));
    }
  }

  private createFromForm(): IGeneration {
    return {
      ...new Generation(),
      id: this.editForm.get(['id'])!.value,
      dateGeneration: this.editForm.get(['dateGeneration'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeneration>>): void {
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
