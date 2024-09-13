interface ResponseErrorParams {
  statusCode: number;
  errorCode?: string;
  message?: string;
  fetchedToken?: string;
}

class ResponseError extends Error {
  public statusCode: number | undefined;
  public errorCode: string | undefined;
  public fetchedToken: string | undefined;

  constructor(params: ResponseErrorParams) {
    const { message, statusCode, errorCode, fetchedToken } = params;

    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.fetchedToken = fetchedToken;
  }
}

export default ResponseError;

export const isResponseError = (error: any): error is ResponseError => {
  return error instanceof ResponseError;
};
