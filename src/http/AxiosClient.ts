import axios, { AxiosError } from "axios";
import {
  HttpClient,
  ErrorResponseHandler,
  RequestConfigBuilder,
  RequestConfig,
} from "./HttpClientInterface";

export class AxiosClient implements HttpClient {
  private readonly errorResponseHandler: ErrorResponseHandler;
  private readonly requestConfigBuilder: RequestConfigBuilder;

  constructor({
    errorResponseHandler,
    requestConfigBuilder,
  }: {
    errorResponseHandler: ErrorResponseHandler;
    requestConfigBuilder: RequestConfigBuilder;
  }) {
    this.errorResponseHandler = errorResponseHandler;
    this.requestConfigBuilder = requestConfigBuilder;
  }

  public async get(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "get",
      path,
      params
    );
    return this.sendRequest(requestConfig);
  }

  public async post(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "post",
      path,
      params
    );
    return this.sendRequest(requestConfig);
  }

  public async patch(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "patch",
      path,
      params
    );
    return this.sendRequest(requestConfig);
  }

  public async delete(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "delete",
      path,
      params
    );
    return this.sendRequest(requestConfig);
  }

  private async sendRequest(requestConfig: RequestConfig) {
    let data;
    try {
      const response = await axios({
        ...requestConfig,

        // NOTE: For defining the max size of the http request content, `maxBodyLength` will be used after version 0.20.0.
        // `maxContentLength` will be still needed for defining the max size of the http response content.
        // ref: https://github.com/axios/axios/pull/2781/files
        // maxBodyLength: Infinity,

        maxContentLength: Infinity,
      });
      data = response.data;
    } catch (error) {
      this.handleError(error);
    }
    return data;
  }

  private handleError(error: AxiosError) {
    this.errorResponseHandler(error);
  }
}
