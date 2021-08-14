import { Moment } from 'moment';

export interface IGeneration {
  id?: number;
  dateGeneration?: Moment;
}

export class Generation implements IGeneration {
  constructor(public id?: number, public dateGeneration?: Moment) {}
}
