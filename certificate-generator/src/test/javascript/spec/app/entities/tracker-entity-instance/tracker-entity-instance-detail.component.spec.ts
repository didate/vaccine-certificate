import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CertificateGeneratorTestModule } from '../../../test.module';
import { TrackerEntityInstanceDetailComponent } from 'app/entities/tracker-entity-instance/tracker-entity-instance-detail.component';
import { TrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';

describe('Component Tests', () => {
  describe('TrackerEntityInstance Management Detail Component', () => {
    let comp: TrackerEntityInstanceDetailComponent;
    let fixture: ComponentFixture<TrackerEntityInstanceDetailComponent>;
    const route = ({ data: of({ trackerEntityInstance: new TrackerEntityInstance(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CertificateGeneratorTestModule],
        declarations: [TrackerEntityInstanceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TrackerEntityInstanceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrackerEntityInstanceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load trackerEntityInstance on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.trackerEntityInstance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
