import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CertificateGeneratorSharedModule } from 'app/shared/shared.module';
import { GenerationComponent } from './generation.component';
import { GenerationDetailComponent } from './generation-detail.component';
import { GenerationUpdateComponent } from './generation-update.component';
import { GenerationDeleteDialogComponent } from './generation-delete-dialog.component';
import { generationRoute } from './generation.route';

@NgModule({
  imports: [CertificateGeneratorSharedModule, RouterModule.forChild(generationRoute)],
  declarations: [GenerationComponent, GenerationDetailComponent, GenerationUpdateComponent, GenerationDeleteDialogComponent],
  entryComponents: [GenerationDeleteDialogComponent],
})
export class CertificateGeneratorGenerationModule {}
