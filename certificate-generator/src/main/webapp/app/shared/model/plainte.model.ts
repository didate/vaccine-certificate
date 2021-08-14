export interface IPlainte {
  id?: number;
  telephone?: string;
  localId?: string;
  code?: number;
  commentaire?: string;
}

export class Plainte implements IPlainte {
  constructor(public id?: number, public telephone?: string, public localId?: string, public code?: number, public commentaire?: string) {}
}
