import { MockClient } from "../../http/MockClient";
import { GaroonRequestConfigBuilder } from "../../GaroonRequestConfigBuilder";
import { errorResponseHandler } from "../../GaroonRestAPIClient";
import { NotificationClient } from "../NotificationClient";

describe("NotificationClient", () => {
  let mockClient: MockClient;
  let notificationClient: NotificationClient;

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
    notificationClient = new NotificationClient(mockClient);
  });

  describe("getItems", () => {
    const params = {
      limit: 100,
      offset: 0,
      fields: ["moduleId", "creator"],
    };
    beforeEach(async () => {
      await notificationClient.getItems(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/notification/items");
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass limit, offset and fields as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual({
        limit: 100,
        offset: 0,
        fields: "moduleId,creator",
      });
    });
  });

  describe("addItem", () => {
    const params = {
      app: "Test",
      notificationKey: "test-notification-key",
      operation: "add" as const,
      url: "http://example.com",
      title: "Test title",
      body: "Test body",
      icon: "http://example.com/example.png",
      destinations: [
        {
          type: "USER" as const,
          id: "1",
        },
      ],
    };
    beforeEach(async () => {
      await notificationClient.addItem(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe("/api/v1/notification/items");
    });
    it("should send a post request", () => {
      expect(mockClient.getLogs()[0].method).toBe("post");
    });
    it("should pass params as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual(params);
    });
  });
});
