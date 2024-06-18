interface ResponseErrorParams {
  statusCode: number;
  errorCode?: string;
  message?: string;
}

class ResponseError extends Error {
  public statusCode: number | undefined;
  public errorCode: string | undefined;

  constructor(params: ResponseErrorParams) {
    const { message, statusCode, errorCode } = params;

    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export default ResponseError;
