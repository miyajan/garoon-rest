import qs from "qs";
import { Base64 } from "js-base64";

import {
  RequestConfigBuilder,
  RequestConfig,
  HttpMethod,
  Params,
  ProxyConfig,
} from "./http/HttpClientInterface";
import { BasicAuth, DiscriminatedAuth } from "./GaroonRestAPIClient";
import { platformDeps } from "./platform/";

type Data = Params;

type GaroonAuthHeader =
  | {
      "X-Cybozu-Authorization": string;
      Authorization?: string;
    }
  | {
      "X-Requested-With": "XMLHttpRequest";
      Authorization?: string;
    }
  | {
      Authorization: string;
    };

const THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE = 4096;

export class GaroonRequestConfigBuilder implements RequestConfigBuilder {
  private readonly baseUrl: string;
  private readonly headers: GaroonAuthHeader;
  private readonly auth: DiscriminatedAuth;
  private readonly clientCertAuth?:
    | {
        pfx: Buffer;
        password: string;
      }
    | {
        pfxFilePath: string;
        password: string;
      };
  private readonly proxy?: ProxyConfig;
  private requestToken: string | null;

  constructor({
    baseUrl,
    auth,
    basicAuth,
    clientCertAuth,
    proxy,
  }: {
    baseUrl: string;
    auth: DiscriminatedAuth;
    basicAuth?: BasicAuth;
    clientCertAuth?:
      | {
          pfx: Buffer;
          password: string;
        }
      | {
          pfxFilePath: string;
          password: string;
        };
    proxy?: ProxyConfig;
  }) {
    this.baseUrl = baseUrl;
    this.auth = auth;
    this.headers = this.buildHeaders(basicAuth);
    this.clientCertAuth = clientCertAuth;
    this.proxy = proxy;
    this.requestToken = null;
  }

  public async build(
    method: HttpMethod,
    path: string,
    params: Data,
    options?: { responseType: "arraybuffer" }
  ) {
    const requestConfig: RequestConfig = {
      method,
      headers: this.headers,
      url: `${this.baseUrl}${path}`,
      ...(options ? options : {}),
      ...platformDeps.buildPlatformDependentConfig({
        clientCertAuth: this.clientCertAuth,
      }),
      proxy: this.proxy,
    };

    switch (method) {
      case "get": {
        const requestUrl = this.buildRequestUrl(path, params);
        if (requestUrl.length > THRESHOLD_AVOID_REQUEST_URL_TOO_LARGE) {
          return {
            ...requestConfig,
            method: "post" as const,
            headers: { ...this.headers, "X-HTTP-Method-Override": "GET" },
            data: await this.buildData(params),
          };
        }
        return {
          ...requestConfig,
          url: requestUrl,
        };
      }
      case "post": {
        return {
          ...requestConfig,
          headers: { ...this.headers, "Content-Type": "application/json" },
          data: await this.buildData(params),
        };
      }
      case "patch": {
        return {
          ...requestConfig,
          headers: { ...this.headers, "Content-Type": "application/json" },
          data: await this.buildData(params),
        };
      }
      case "delete": {
        const requestUrl = this.buildRequestUrl(
          path,
          await this.buildData(params)
        );
        return {
          ...requestConfig,
          url: requestUrl,
        };
      }
      default: {
        throw new Error(`${method} method is not supported`);
      }
    }
  }

  private buildRequestUrl(path: string, params: Data): string {
    return `${this.baseUrl}${path}?${qs.stringify(params)}`;
  }

  private async buildData<T extends Data>(params: T): Promise<T> {
    if (this.auth.type === "session") {
      const requestToken = await this.getRequestToken();
      return {
        __REQUEST_TOKEN__: requestToken,
        ...params,
      };
    }
    return params;
  }

  private buildHeaders(basicAuth?: BasicAuth): GaroonAuthHeader {
    const basicAuthHeaders = basicAuth
      ? {
          Authorization: `Basic ${Base64.encode(
            `${basicAuth.username}:${basicAuth.password}`
          )}`,
        }
      : {};
    const platformDepsHeaders = platformDeps.buildHeaders();

    const commonHeaders = { ...platformDepsHeaders, ...basicAuthHeaders };

    switch (this.auth.type) {
      case "password": {
        return {
          ...commonHeaders,
          "X-Cybozu-Authorization": Base64.encode(
            `${this.auth.username}:${this.auth.password}`
          ),
        };
      }
      case "oAuthToken": {
        return {
          ...commonHeaders,
          Authorization: `Bearer ${this.auth.oAuthToken}`,
        };
      }
      default: {
        return { ...commonHeaders, "X-Requested-With": "XMLHttpRequest" };
      }
    }
  }

  private async getRequestToken(): Promise<string> {
    if (this.requestToken === null) {
      this.requestToken = await platformDeps.getRequestToken();
    }
    return this.requestToken;
  }
}
