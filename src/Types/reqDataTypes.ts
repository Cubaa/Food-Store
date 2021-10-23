export interface IReqData {
  url: string;
  method: string;
  headers?: HeadersInit;
  body?: any | undefined | null;
}
