import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CertificateGeneratorSharedModule } from 'app/shared/shared.module';
import { PlainteComponent } from './plainte.component';
import { PlainteDetailComponent } from './plainte-detail.component';
import { PlainteUpdateComponent } from './plainte-update.component';
import { PlainteDeleteDialogComponent } from './plainte-delete-dialog.component';
import { plainteRoute } from './plainte.route';

@NgModule({
  imports: [CertificateGeneratorSharedModule, RouterModule.forChild(plainteRoute)],
  declarations: [PlainteComponent, PlainteDetailComponent, PlainteUpdateComponent, PlainteDeleteDialogComponent],
  entryComponents: [PlainteDeleteDialogComponent],
})
export class CertificateGeneratorPlainteModule {}
