import { Moment } from 'moment';
import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';

export interface IEvent {
  id?: number;
  uid?: string;
  dateVaccination?: Moment;
  siteVaccination?: string;
  typeVaccin?: string;
  lot?: string;
  dose?: string;
  tei?: ITrackerEntityInstance;
}

export class Event implements IEvent {
  constructor(
    public id?: number,
    public uid?: string,
    public dateVaccination?: Moment,
    public siteVaccination?: string,
    public typeVaccin?: string,
    public lot?: string,
    public dose?: string,
    public tei?: ITrackerEntityInstance
  ) {}
}
