import {
  HttpClient,
  RequestConfigBuilder,
  ErrorResponseHandler,
} from "./HttpClientInterface";

type Log = {
  method: "get" | "post" | "patch" | "delete";
  path: string;
  params: {
    [key: string]: any;
  };
};

export class MockClient implements HttpClient {
  private readonly errorResponseHandler: ErrorResponseHandler;
  private readonly requestConfigBuilder: RequestConfigBuilder;
  logs: Log[];
  responses: Array<Record<string, unknown>>;

  constructor({
    errorResponseHandler,
    requestConfigBuilder,
  }: {
    errorResponseHandler: ErrorResponseHandler;
    requestConfigBuilder: RequestConfigBuilder;
  }) {
    this.errorResponseHandler = errorResponseHandler;
    this.requestConfigBuilder = requestConfigBuilder;
    this.logs = [];
    this.responses = [];
  }

  public mockResponse(mock: Record<string, unknown>) {
    this.responses.push(mock);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  private createResponse<T extends object>(): T {
    const response = this.responses.shift() || {};
    if (response instanceof Error) {
      this.errorResponseHandler(response);
    }
    return response as T;
  }

  public async get<T extends Record<string, unknown>>(
    path: string,
    params: any
  ): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build(
      "get",
      path,
      params
    );
    this.logs.push({ method: requestConfig.method, path, params });
    return this.createResponse<T>();
  }
  public async post<T extends Record<string, unknown>>(
    path: string,
    params: any
  ): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build(
      "post",
      path,
      params
    );
    this.logs.push({ method: requestConfig.method, path, params });
    return this.createResponse<T>();
  }
  public async patch<T extends Record<string, unknown>>(
    path: string,
    params: any
  ): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build(
      "patch",
      path,
      params
    );
    this.logs.push({ method: requestConfig.method, path, params });
    return this.createResponse<T>();
  }
  public async delete<T extends Record<string, unknown>>(
    path: string,
    params: any
  ): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build(
      "delete",
      path,
      params
    );
    this.logs.push({ method: requestConfig.method, path, params });
    return this.createResponse<T>();
  }
  public getLogs(): Log[] {
    return this.logs;
  }
}
