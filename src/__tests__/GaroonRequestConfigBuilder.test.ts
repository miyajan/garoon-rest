import { GaroonRequestConfigBuilder } from "../GaroonRequestConfigBuilder";
import { DiscriminatedAuth } from "../GaroonRestAPIClient";
import os from "os";
import { injectPlatformDeps } from "../platform";
import * as browserDeps from "../platform/browser";

const packageJson = require("../../package.json");
const nodeVersion = process.version;
const osName = os.type();
const packageName = packageJson.name;
const packageVersion = packageJson.version;

const expectedUa = `Node.js/${nodeVersion}(${osName}) ${packageName}@${packageVersion}`;

describe("GaroonRequestConfigBuilder", () => {
  describe("in Node.js environment", () => {
    const baseUrl = "https://example.cybozu.com/g";
    const auth: DiscriminatedAuth = {
      type: "password",
      username: "cybozu",
      password: "cybozu",
    };
    const expectedAuth = "Y3lib3p1OmN5Ym96dQ==";
    let garoonRequestConfigBuilder: GaroonRequestConfigBuilder;
    beforeEach(() => {
      garoonRequestConfigBuilder = new GaroonRequestConfigBuilder({
        baseUrl,
        auth,
      });
    });
    it("should build get method requestConfig", async () => {
      const requestConfig = await garoonRequestConfigBuilder.build(
        "get",
        "/api/v1/schedule/events/1",
        { key: "value" }
      );
      expect(requestConfig).toStrictEqual({
        method: "get",
        proxy: undefined,
        url: `${baseUrl}/api/v1/schedule/events/1?key=value`,
        headers: {
          "User-Agent": expectedUa,
          "X-Cybozu-Authorization": expectedAuth,
        },
      });
    });
    it("should build post method requestConfig", async () => {
      const requestConfig = await garoonRequestConfigBuilder.build(
        "post",
        "/api/v1/schedule/events",
        { key: "value" }
      );
      expect(requestConfig).toStrictEqual({
        method: "post",
        proxy: undefined,
        url: `${baseUrl}/api/v1/schedule/events`,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": expectedUa,
          "X-Cybozu-Authorization": expectedAuth,
        },
        data: {
          key: "value",
        },
      });
    });
    it("should build patch method requestConfig", async () => {
      const requestConfig = await garoonRequestConfigBuilder.build(
        "patch",
        "/api/v1/schedule/events/1",
        { key: "value" }
      );
      expect(requestConfig).toStrictEqual({
        method: "patch",
        proxy: undefined,
        url: `${baseUrl}/api/v1/schedule/events/1`,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": expectedUa,
          "X-Cybozu-Authorization": expectedAuth,
        },
        data: {
          key: "value",
        },
      });
    });
    it("should build delete method requestConfig", async () => {
      const requestConfig = await garoonRequestConfigBuilder.build(
        "delete",
        "/api/v1/schedule/events/1",
        { key: "value" }
      );
      expect(requestConfig).toStrictEqual({
        method: "delete",
        proxy: undefined,
        url: `${baseUrl}/api/v1/schedule/events/1?key=value`,
        headers: {
          "User-Agent": expectedUa,
          "X-Cybozu-Authorization": expectedAuth,
        },
        data: {},
      });
    });
  });

  describe("in Browser environment", () => {
    const baseUrl = "https://example.com/cgi-bin/cbgrn/grn.cgi";
    const requestToken = "requestToken";
    const auth: DiscriminatedAuth = {
      type: "session",
    };
    const expectedAuth = "Y3lib3p1OmN5Ym96dQ==";
    let garoonRequestConfigBuilder: GaroonRequestConfigBuilder;
    beforeEach(() => {
      injectPlatformDeps({
        ...browserDeps,
        getRequestToken: async () => requestToken,
      });

      garoonRequestConfigBuilder = new GaroonRequestConfigBuilder({
        baseUrl,
        auth,
      });
    });
    it("should build get method requestConfig", async () => {
      const requestConfig = await garoonRequestConfigBuilder.build(
        "get",
        "/api/v1/schedule/events/1",
        { key: "value" }
      );
      expect(requestConfig).toStrictEqual({
        method: "get",
        proxy: undefined,
        url: `${baseUrl}/api/v1/schedule/events/1?key=value`,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
    });
    it("should build post method requestConfig", async () => {
      const requestConfig = await garoonRequestConfigBuilder.build(
        "post",
        "/api/v1/schedule/events",
        { key: "value" }
      );
      expect(requestConfig).toStrictEqual({
        method: "post",
        proxy: undefined,
        url: `${baseUrl}/api/v1/schedule/events`,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        data: {
          key: "value",
          __REQUEST_TOKEN__: requestToken,
        },
      });
    });
    it("should build patch method requestConfig", async () => {
      const requestConfig = await garoonRequestConfigBuilder.build(
        "patch",
        "/api/v1/schedule/events/1",
        { key: "value" }
      );
      expect(requestConfig).toStrictEqual({
        method: "patch",
        proxy: undefined,
        url: `${baseUrl}/api/v1/schedule/events/1`,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        data: {
          key: "value",
          __REQUEST_TOKEN__: requestToken,
        },
      });
    });
    it("should build delete method requestConfig", async () => {
      const requestConfig = await garoonRequestConfigBuilder.build(
        "delete",
        "/api/v1/schedule/events/1",
        { key: "value" }
      );
      expect(requestConfig).toStrictEqual({
        method: "delete",
        proxy: undefined,
        url: `${baseUrl}/api/v1/schedule/events/1?key=value`,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        data: {
          __REQUEST_TOKEN__: requestToken,
        },
      });
    });
  });
});
