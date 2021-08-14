import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';
import { TrackerEntityInstanceService } from './tracker-entity-instance.service';

@Component({
  templateUrl: './tracker-entity-instance-delete-dialog.component.html',
})
export class TrackerEntityInstanceDeleteDialogComponent {
  trackerEntityInstance?: ITrackerEntityInstance;

  constructor(
    protected trackerEntityInstanceService: TrackerEntityInstanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trackerEntityInstanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('trackerEntityInstanceListModification');
      this.activeModal.close();
    });
  }
}
