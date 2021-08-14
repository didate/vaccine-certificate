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

export class TrackerEntityInstance implements ITrackerEntityInstance {
  constructor(
    public id?: number,
    public uid?: string,
    public nom?: string,
    public prenom?: string,
    public sexe?: string,
    public profession?: string,
    public age?: number,
    public region?: string,
    public prefecture?: string,
    public sousPrefecture?: string,
    public quartier?: string,
    public village?: string,
    public telephone?: string,
    public localId?: string,
    public code?: number,
    public certificate?: string,
    public events?: IEvent[]
  ) {}
}
