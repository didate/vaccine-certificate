import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CertificateGeneratorTestModule } from '../../../test.module';
import { GenerationDetailComponent } from 'app/entities/generation/generation-detail.component';
import { Generation } from 'app/shared/model/generation.model';

describe('Component Tests', () => {
  describe('Generation Management Detail Component', () => {
    let comp: GenerationDetailComponent;
    let fixture: ComponentFixture<GenerationDetailComponent>;
    const route = ({ data: of({ generation: new Generation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CertificateGeneratorTestModule],
        declarations: [GenerationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GenerationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenerationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load generation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.generation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
