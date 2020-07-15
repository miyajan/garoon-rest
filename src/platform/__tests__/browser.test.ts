import { buildBaseUrl } from "../browser";

describe("buildBaseUrl", () => {
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

    it("should build base url from location when baseUrl is not specified", () => {
      expect(buildBaseUrl()).toBe("https://example.cybozu.com/g");
    });

    it("should return baseUrl when baseUrl is specified", () => {
      expect(buildBaseUrl("https://hoge.cybozu.com/g")).toBe(
        "https://hoge.cybozu.com/g"
      );
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

    it("should build base url from location when baseUrl is not specified", () => {
      expect(buildBaseUrl()).toBe("http://example.com/cgi-bin/cbgrn/grn.cgi");
    });

    it("should return baseUrl when baseUrl is specified", () => {
      expect(buildBaseUrl("http://hoge.com/scripts/garoon/grn.exe")).toBe(
        "http://hoge.com/scripts/garoon/grn.exe"
      );
    });
  });
});
