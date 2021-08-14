import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CertificateGeneratorSharedModule } from 'app/shared/shared.module';
import { CertificateGeneratorCoreModule } from 'app/core/core.module';
import { CertificateGeneratorAppRoutingModule } from './app-routing.module';
import { CertificateGeneratorHomeModule } from './home/home.module';
import { CertificateGeneratorEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    CertificateGeneratorSharedModule,
    CertificateGeneratorCoreModule,
    CertificateGeneratorHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CertificateGeneratorEntityModule,
    CertificateGeneratorAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class CertificateGeneratorAppModule {}
