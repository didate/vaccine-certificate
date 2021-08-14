import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { CertificateGeneratorTestModule } from '../../../test.module';
import { SignatureDetailComponent } from 'app/entities/signature/signature-detail.component';
import { Signature } from 'app/shared/model/signature.model';

describe('Component Tests', () => {
  describe('Signature Management Detail Component', () => {
    let comp: SignatureDetailComponent;
    let fixture: ComponentFixture<SignatureDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ signature: new Signature(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CertificateGeneratorTestModule],
        declarations: [SignatureDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SignatureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SignatureDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load signature on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.signature).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
