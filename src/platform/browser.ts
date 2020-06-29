import { UnsupportedPlatformError } from "./UnsupportedPlatformError";
import { DiscriminatedAuth } from "../GaroonRestAPIClient";

export const readFileFromPath = (filePath: string) => {
  throw new UnsupportedPlatformError("Browser");
};

export const getRequestToken = async () => {
  if (
    garoon !== null &&
    typeof garoon === "object" &&
    typeof garoon.base?.request?.getRequestToken === "function"
  ) {
    return garoon.base.request.getRequestToken();
  }

  throw new Error("session authentication must specify a request token");
};

export const getDefaultAuth = (): DiscriminatedAuth => {
  return {
    type: "session",
  };
};

export const buildPlatformDependentConfig = () => {
  return {};
};

export const buildHeaders = () => {
  return {};
};

export const buildFormDataValue = (data: unknown) => {
  return new Blob([data]);
};

export const buildBaseUrl = (baseUrl?: string) => {
  // We assume that location always exists in a browser environment
  const { host, protocol } = location!;
  return baseUrl ?? `${protocol}//${host}`;
};
