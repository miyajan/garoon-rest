import { buildBaseUrl } from "../browser";

describe("buildBaseUrl", () => {
  describe("when cybozu.com", () => {
    beforeEach(() => {
      (global as any).location = {
        protocol: "https:",
        host: "example.cybozu.com",
        href: "https://example.cybozu.com",
      };
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
    beforeEach(() => {
      (global as any).location = {
        protocol: "http:",
        host: "example.com",
        href: "http://example.com/cgi-bin/cbgrn/grn.cgi/index",
      };
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
