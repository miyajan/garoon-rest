export interface HttpClient {
  get: <T extends Record<string, unknown>>(
    path: string,
    params: Record<string, unknown>
  ) => Promise<T>;
  post: <T extends Record<string, unknown>>(
    path: string,
    params: Record<string, unknown>
  ) => Promise<T>;
  patch: <T extends Record<string, unknown>>(
    path: string,
    params: Record<string, unknown>
  ) => Promise<T>;
  delete: <T extends Record<string, unknown>>(
    path: string,
    params: Record<string, unknown>
  ) => Promise<T>;
}

export type ErrorResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
};

export type HttpMethod = "get" | "post" | "patch" | "delete";
export type Params = { [key: string]: unknown };

export type ProxyConfig = {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
};

export interface HttpClientError<T = ErrorResponse> extends Error {
  response?: T;
}
export type ErrorResponseHandler = (error: HttpClientError) => void;

export type RequestConfig = {
  method: HttpMethod;
  url: string;
  headers: any;
  httpsAgent?: any;
  data?: any;
  proxy?: ProxyConfig;
};

export interface RequestConfigBuilder {
  build: (
    method: HttpMethod,
    path: string,
    params: Params,
    options?: { responseType: "arraybuffer" }
  ) => Promise<RequestConfig>;
}
