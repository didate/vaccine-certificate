import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CertificateGeneratorSharedModule } from 'app/shared/shared.module';
import { SignatureComponent } from './signature.component';
import { SignatureDetailComponent } from './signature-detail.component';
import { SignatureUpdateComponent } from './signature-update.component';
import { SignatureDeleteDialogComponent } from './signature-delete-dialog.component';
import { signatureRoute } from './signature.route';

@NgModule({
  imports: [CertificateGeneratorSharedModule, RouterModule.forChild(signatureRoute)],
  declarations: [SignatureComponent, SignatureDetailComponent, SignatureUpdateComponent, SignatureDeleteDialogComponent],
  entryComponents: [SignatureDeleteDialogComponent],
})
export class CertificateGeneratorSignatureModule {}
