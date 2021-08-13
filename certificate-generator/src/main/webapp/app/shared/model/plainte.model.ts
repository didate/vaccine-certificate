export interface IPlainte {
  id?: number;
  telephone?: string;
  localId?: string;
  code?: number;
  commentaire?: string;
}

export const defaultValue: Readonly<IPlainte> = {};
