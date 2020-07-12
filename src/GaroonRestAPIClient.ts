import { ScheduleClient } from "./client/ScheduleClient";
import { DefaultHttpClient } from "./http";
import {
  ErrorResponse,
  HttpClientError,
  ProxyConfig,
} from "./http/HttpClientInterface";
import { GaroonErrorResponse, GaroonRestAPIError } from "./GaroonRestAPIError";
import { platformDeps } from "./platform";
import { UnsupportedPlatformError } from "./platform/UnsupportedPlatformError";
import { GaroonRequestConfigBuilder } from "./GaroonRequestConfigBuilder";
import { WorkflowClient } from "./client/WorkflowClient";

export type DiscriminatedAuth = PasswordAuth | SessionAuth | OAuthTokenAuth;

type Auth =
  | Omit<PasswordAuth, "type">
  | Omit<SessionAuth, "type">
  | Omit<OAuthTokenAuth, "type">;

type PasswordAuth = {
  type: "password";
  username: string;
  password: string;
};

type SessionAuth = {
  type: "session";
};

type OAuthTokenAuth = {
  type: "oAuthToken";
  oAuthToken: string;
};

export type BasicAuth = {
  username: string;
  password: string;
};

type Options = {
  baseUrl?: string;
  auth?: Auth;
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
};

export const errorResponseHandler = (
  error: HttpClientError<ErrorResponse<string> | GaroonErrorResponse>
) => {
  if (!error.response) {
    // FIXME: find a better way to handle this error
    if (/mac verify failure/.test(error.toString())) {
      throw new Error("invalid clientCertAuth setting");
    }
    throw error;
  }
  const errorResponse = error.response;

  const { data, ...rest } = errorResponse;
  if (typeof data === "string") {
    throw new Error(`${rest.status}: ${rest.statusText}`);
  }
  throw new GaroonRestAPIError({ data, ...rest });
};

const buildDiscriminatedAuth = (auth: Auth): DiscriminatedAuth => {
  if ("username" in auth) {
    return { type: "password", ...auth };
  }
  if ("oAuthToken" in auth) {
    return { type: "oAuthToken", ...auth };
  }
  try {
    return platformDeps.getDefaultAuth();
  } catch (e) {
    if (e instanceof UnsupportedPlatformError) {
      throw new Error(
        `session authentication is not supported in ${e.platform} environment.`
      );
    }
    throw e;
  }
};

export class GaroonRestAPIClient {
  readonly schedule: ScheduleClient;
  readonly workflow: WorkflowClient;
  private readonly baseUrl: string;

  constructor(options: Options = {}) {
    this.baseUrl = platformDeps.buildBaseUrl(options.baseUrl);

    const auth = buildDiscriminatedAuth(options.auth ?? {});
    const requestConfigBuilder = new GaroonRequestConfigBuilder({
      ...options,
      baseUrl: this.baseUrl,
      auth,
    });
    const httpClient = new DefaultHttpClient({
      errorResponseHandler,
      requestConfigBuilder,
    });
    this.schedule = new ScheduleClient(httpClient);
    this.workflow = new WorkflowClient(httpClient);
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}
