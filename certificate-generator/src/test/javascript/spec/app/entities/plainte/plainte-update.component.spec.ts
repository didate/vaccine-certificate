import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CertificateGeneratorTestModule } from '../../../test.module';
import { PlainteUpdateComponent } from 'app/entities/plainte/plainte-update.component';
import { PlainteService } from 'app/entities/plainte/plainte.service';
import { Plainte } from 'app/shared/model/plainte.model';

describe('Component Tests', () => {
  describe('Plainte Management Update Component', () => {
    let comp: PlainteUpdateComponent;
    let fixture: ComponentFixture<PlainteUpdateComponent>;
    let service: PlainteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CertificateGeneratorTestModule],
        declarations: [PlainteUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PlainteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlainteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlainteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Plainte(123);
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
        const entity = new Plainte();
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
