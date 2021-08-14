import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CertificateGeneratorTestModule } from '../../../test.module';
import { PlainteDetailComponent } from 'app/entities/plainte/plainte-detail.component';
import { Plainte } from 'app/shared/model/plainte.model';

describe('Component Tests', () => {
  describe('Plainte Management Detail Component', () => {
    let comp: PlainteDetailComponent;
    let fixture: ComponentFixture<PlainteDetailComponent>;
    const route = ({ data: of({ plainte: new Plainte(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CertificateGeneratorTestModule],
        declarations: [PlainteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PlainteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlainteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load plainte on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.plainte).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
