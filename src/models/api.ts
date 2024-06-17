export interface ResponseBody {
  isSuccess: boolean;
  code: string;
  message: string;
}

export interface PageInfo {
  totalPages: number;
  totalElements: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}
