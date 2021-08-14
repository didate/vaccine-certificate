export interface ISignature {
  id?: number;
  authorite?: string;
  signatureContentType?: string;
  signature?: any;
}

export class Signature implements ISignature {
  constructor(public id?: number, public authorite?: string, public signatureContentType?: string, public signature?: any) {}
}
