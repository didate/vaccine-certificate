import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackerEntityInstanceService } from 'app/entities/tracker-entity-instance/tracker-entity-instance.service';
import { ITrackerEntityInstance, TrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';

describe('Service Tests', () => {
  describe('TrackerEntityInstance Service', () => {
    let injector: TestBed;
    let service: TrackerEntityInstanceService;
    let httpMock: HttpTestingController;
    let elemDefault: ITrackerEntityInstance;
    let expectedResult: ITrackerEntityInstance | ITrackerEntityInstance[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TrackerEntityInstanceService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TrackerEntityInstance(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TrackerEntityInstance', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TrackerEntityInstance()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TrackerEntityInstance', () => {
        const returnedFromService = Object.assign(
          {
            uid: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            sexe: 'BBBBBB',
            profession: 'BBBBBB',
            age: 1,
            region: 'BBBBBB',
            prefecture: 'BBBBBB',
            sousPrefecture: 'BBBBBB',
            quartier: 'BBBBBB',
            village: 'BBBBBB',
            telephone: 'BBBBBB',
            localId: 'BBBBBB',
            code: 1,
            certificate: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TrackerEntityInstance', () => {
        const returnedFromService = Object.assign(
          {
            uid: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            sexe: 'BBBBBB',
            profession: 'BBBBBB',
            age: 1,
            region: 'BBBBBB',
            prefecture: 'BBBBBB',
            sousPrefecture: 'BBBBBB',
            quartier: 'BBBBBB',
            village: 'BBBBBB',
            telephone: 'BBBBBB',
            localId: 'BBBBBB',
            code: 1,
            certificate: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TrackerEntityInstance', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
