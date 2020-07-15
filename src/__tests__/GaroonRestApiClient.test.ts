import { injectPlatformDeps } from "../platform";
import * as browserDeps from "../platform/browser";
import { GaroonRestAPIClient } from "../GaroonRestAPIClient";

describe("GaroonRestApiClient", () => {
  describe("constructor", () => {
    describe("when cybozu.com", () => {
      let originalLocation: any;
      beforeEach(() => {
        originalLocation = global.location;
        global.location = {
          protocol: "https:",
          host: "example.cybozu.com",
          href: "https://example.cybozu.com",
        };
      });
      afterEach(() => {
        global.location = originalLocation;
      });
      it("should use a location object in browser environment if baseUrl param is not specified", () => {
        injectPlatformDeps(browserDeps);
        const client = new GaroonRestAPIClient();
        expect(client.getBaseUrl()).toBe("https://example.cybozu.com/g");
      });
    });

    describe("when on-premise", () => {
      let originalLocation: any;
      beforeEach(() => {
        originalLocation = global.location;
        global.location = {
          protocol: "http:",
          host: "example.com",
          href: "http://example.com/cgi-bin/cbgrn/grn.cgi/index",
        };
      });
      afterEach(() => {
        global.location = originalLocation;
      });
      it("should use a location object in browser environment if baseUrl param is not specified", () => {
        injectPlatformDeps(browserDeps);
        const client = new GaroonRestAPIClient();
        expect(client.getBaseUrl()).toBe(
          "http://example.com/cgi-bin/cbgrn/grn.cgi"
        );
      });
    });
  });
});
