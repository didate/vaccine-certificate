import { Moment } from 'moment';
import { ITrackerEntityInstance } from 'app/shared/model/tracker-entity-instance.model';

export interface IEvent {
  id?: number;
  uid?: string;
  dateVaccination?: string;
  siteVaccination?: string;
  typeVaccin?: string;
  lot?: string;
  tei?: ITrackerEntityInstance;
}

export const defaultValue: Readonly<IEvent> = {};
