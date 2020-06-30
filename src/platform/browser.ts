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
  if (baseUrl) {
    return baseUrl;
  }

  // We assume that location always exists in a browser environment

  // on-premise
  if (location!.href.includes("grn.cgi")) {
    return location!.href.substring(
      0,
      location!.href.indexOf("grn.cgi") + "grn.cgi".length
    );
  }
  if (location!.href.includes("grn.exe")) {
    return location!.href.substring(
      0,
      location!.href.indexOf("grn.exe") + "grn.exe".length
    );
  }

  // cybozu.com
  const { host, protocol } = location!;
  return baseUrl ?? `${protocol}//${host}/g`;
};
