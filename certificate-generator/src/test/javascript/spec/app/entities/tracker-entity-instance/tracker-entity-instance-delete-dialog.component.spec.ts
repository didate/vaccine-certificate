import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CertificateGeneratorTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { TrackerEntityInstanceDeleteDialogComponent } from 'app/entities/tracker-entity-instance/tracker-entity-instance-delete-dialog.component';
import { TrackerEntityInstanceService } from 'app/entities/tracker-entity-instance/tracker-entity-instance.service';

describe('Component Tests', () => {
  describe('TrackerEntityInstance Management Delete Component', () => {
    let comp: TrackerEntityInstanceDeleteDialogComponent;
    let fixture: ComponentFixture<TrackerEntityInstanceDeleteDialogComponent>;
    let service: TrackerEntityInstanceService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CertificateGeneratorTestModule],
        declarations: [TrackerEntityInstanceDeleteDialogComponent],
      })
        .overrideTemplate(TrackerEntityInstanceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrackerEntityInstanceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackerEntityInstanceService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
