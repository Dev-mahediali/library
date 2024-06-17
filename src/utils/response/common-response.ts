export class CommonResponse<T> {
  status: number;
  message: string;
  data: T;

  constructor(status: number, message: string, data: T) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}
