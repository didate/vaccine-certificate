export interface ISignature {
  id?: number;
  authorite?: string;
  signatureContentType?: string;
  signature?: any;
}

export const defaultValue: Readonly<ISignature> = {};
