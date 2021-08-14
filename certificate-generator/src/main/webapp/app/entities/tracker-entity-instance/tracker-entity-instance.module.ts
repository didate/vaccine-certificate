import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CertificateGeneratorSharedModule } from 'app/shared/shared.module';
import { TrackerEntityInstanceComponent } from './tracker-entity-instance.component';
import { TrackerEntityInstanceDetailComponent } from './tracker-entity-instance-detail.component';
import { TrackerEntityInstanceUpdateComponent } from './tracker-entity-instance-update.component';
import { TrackerEntityInstanceDeleteDialogComponent } from './tracker-entity-instance-delete-dialog.component';
import { trackerEntityInstanceRoute } from './tracker-entity-instance.route';

@NgModule({
  imports: [CertificateGeneratorSharedModule, RouterModule.forChild(trackerEntityInstanceRoute)],
  declarations: [
    TrackerEntityInstanceComponent,
    TrackerEntityInstanceDetailComponent,
    TrackerEntityInstanceUpdateComponent,
    TrackerEntityInstanceDeleteDialogComponent,
  ],
  entryComponents: [TrackerEntityInstanceDeleteDialogComponent],
})
export class CertificateGeneratorTrackerEntityInstanceModule {}
