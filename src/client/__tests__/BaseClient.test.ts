import { MockClient } from "../../http/MockClient";
import { GaroonRequestConfigBuilder } from "../../GaroonRequestConfigBuilder";
import { errorResponseHandler } from "../../GaroonRestAPIClient";
import { BaseClient } from "../BaseClient";

describe("BaseClient", () => {
  let mockClient: MockClient;
  let baseClient: BaseClient;

  beforeEach(() => {
    const requestConfigBuilder = new GaroonRequestConfigBuilder({
      baseUrl: "https://example.cybozu.com/g",
      auth: {
        type: "password",
        username: "cybozu",
        password: "cybozu",
      },
    });
    mockClient = new MockClient({ requestConfigBuilder, errorResponseHandler });
    baseClient = new BaseClient(mockClient);
  });

  describe("getUsers", () => {
    const params = {
      limit: 100,
      offset: 0,
      name: "test",
    };
    beforeEach(async () => {
      await baseClient.getUsers(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/base/users");
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass params as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual(params);
    });
  });

  describe("getOrganizations", () => {
    const params = {
      limit: 100,
      offset: 0,
      name: "test",
    };
    beforeEach(async () => {
      await baseClient.getOrganizations(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/base/organizations");
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass params as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual(params);
    });
  });

  describe("getUsersByOrganizationID", () => {
    const params = {
      id: 1,
      limit: 100,
      offset: 0,
    };
    beforeEach(async () => {
      await baseClient.getUsersByOrganizationID(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe(
        "/api/v1/base/organizations/1/users"
      );
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass limit and offset as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual({
        limit: 100,
        offset: 0,
      });
    });
  });
});
