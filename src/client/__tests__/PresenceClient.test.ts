import { MockClient } from "../../http/MockClient";
import { GaroonRequestConfigBuilder } from "../../GaroonRequestConfigBuilder";
import { errorResponseHandler } from "../../GaroonRestAPIClient";
import { PresenceClient } from "../PresenceClient";

describe("PresenceClient", () => {
  let mockClient: MockClient;
  let presenceClient: PresenceClient;

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
    presenceClient = new PresenceClient(mockClient);
  });

  describe("getPresenceByUserID", () => {
    const params = { id: 1 };
    beforeEach(async () => {
      await presenceClient.getPresenceByUserID(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/presence/users/1");
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass an empty object as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual({});
    });
  });
});
