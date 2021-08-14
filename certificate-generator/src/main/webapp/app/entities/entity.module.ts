import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tracker-entity-instance',
        loadChildren: () =>
          import('./tracker-entity-instance/tracker-entity-instance.module').then(m => m.CertificateGeneratorTrackerEntityInstanceModule),
      },
      {
        path: 'generation',
        loadChildren: () => import('./generation/generation.module').then(m => m.CertificateGeneratorGenerationModule),
      },
      {
        path: 'event',
        loadChildren: () => import('./event/event.module').then(m => m.CertificateGeneratorEventModule),
      },
      {
        path: 'signature',
        loadChildren: () => import('./signature/signature.module').then(m => m.CertificateGeneratorSignatureModule),
      },
      {
        path: 'plainte',
        loadChildren: () => import('./plainte/plainte.module').then(m => m.CertificateGeneratorPlainteModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CertificateGeneratorEntityModule {}
