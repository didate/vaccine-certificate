import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CertificateGeneratorTestModule } from '../../../test.module';
import { TrackerEntityInstanceUpdateComponent } from 'app/entities/tracker-entity-instance/tracker-entity-instance-update.component';
import { TrackerEntityInstanceService } from 'app/entities/tracker-entity-instance/tracker-entity-instance.service';
import { TrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';

describe('Component Tests', () => {
  describe('TrackerEntityInstance Management Update Component', () => {
    let comp: TrackerEntityInstanceUpdateComponent;
    let fixture: ComponentFixture<TrackerEntityInstanceUpdateComponent>;
    let service: TrackerEntityInstanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CertificateGeneratorTestModule],
        declarations: [TrackerEntityInstanceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TrackerEntityInstanceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackerEntityInstanceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackerEntityInstanceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrackerEntityInstance(123);
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
        const entity = new TrackerEntityInstance();
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
