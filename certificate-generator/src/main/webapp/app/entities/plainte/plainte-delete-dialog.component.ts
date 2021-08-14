import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlainte } from 'app/shared/model/plainte.model';
import { PlainteService } from './plainte.service';

@Component({
  templateUrl: './plainte-delete-dialog.component.html',
})
export class PlainteDeleteDialogComponent {
  plainte?: IPlainte;

  constructor(protected plainteService: PlainteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.plainteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('plainteListModification');
      this.activeModal.close();
    });
  }
}
