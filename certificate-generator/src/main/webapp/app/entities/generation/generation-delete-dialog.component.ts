import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeneration } from 'app/shared/model/generation.model';
import { GenerationService } from './generation.service';

@Component({
  templateUrl: './generation-delete-dialog.component.html',
})
export class GenerationDeleteDialogComponent {
  generation?: IGeneration;

  constructor(
    protected generationService: GenerationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.generationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('generationListModification');
      this.activeModal.close();
    });
  }
}
