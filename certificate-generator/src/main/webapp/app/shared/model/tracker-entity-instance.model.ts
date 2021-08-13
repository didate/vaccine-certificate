import { IEvent } from 'app/shared/model/event.model';

export interface ITrackerEntityInstance {
  id?: number;
  uid?: string;
  nom?: string;
  prenom?: string;
  sexe?: string;
  profession?: string;
  age?: number;
  region?: string;
  prefecture?: string;
  sousPrefecture?: string;
  quartier?: string;
  village?: string;
  telephone?: string;
  localId?: string;
  code?: number;
  certificate?: string;
  events?: IEvent[];
}

export const defaultValue: Readonly<ITrackerEntityInstance> = {};
