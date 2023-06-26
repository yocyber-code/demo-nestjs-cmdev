export interface ResponseModel {
  status?: number;
  message?: string;
  result: any[] | null;
}

export interface AuthResponseModel {
  status?: number;
  token: string;
}
