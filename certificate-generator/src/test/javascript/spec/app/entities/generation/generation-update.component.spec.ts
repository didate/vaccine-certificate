import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CertificateGeneratorTestModule } from '../../../test.module';
import { GenerationUpdateComponent } from 'app/entities/generation/generation-update.component';
import { GenerationService } from 'app/entities/generation/generation.service';
import { Generation } from 'app/shared/model/generation.model';

describe('Component Tests', () => {
  describe('Generation Management Update Component', () => {
    let comp: GenerationUpdateComponent;
    let fixture: ComponentFixture<GenerationUpdateComponent>;
    let service: GenerationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CertificateGeneratorTestModule],
        declarations: [GenerationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GenerationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenerationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenerationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Generation(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Generation();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
