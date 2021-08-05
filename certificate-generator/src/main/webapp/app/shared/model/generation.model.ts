import { Moment } from 'moment';

export interface IGeneration {
  id?: number;
  dateGeneration?: string;
}

export const defaultValue: Readonly<IGeneration> = {};
