import { ErrorResponse } from "./http/HttpClientInterface";

type GaroonErrorResponseData = {
  error: {
    errorCode: string;
    message: string;
    cause: string;
    counterMeasure: string;
    developerInfo: string;
    backtrace: string;
  };
};

export type GaroonErrorResponse = ErrorResponse<GaroonErrorResponseData>;

export class GaroonRestAPIError extends Error {
  readonly errorCode: string;
  readonly status: number;
  cause: string;
  counterMeasure: string;
  developerInfo: string;
  backtrace: string;

  constructor(error: GaroonErrorResponse) {
    super(error.data.error.message);

    this.name = "GaroonRestAPIError";
    this.errorCode = error.data.error.errorCode;
    this.status = error.status;
    this.cause = error.data.error.cause;
    this.counterMeasure = error.data.error.counterMeasure;
    this.developerInfo = error.data.error.developerInfo;
    this.backtrace = error.data.error.backtrace;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GaroonRestAPIError);
    }

    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, GaroonRestAPIError.prototype);
  }
}
