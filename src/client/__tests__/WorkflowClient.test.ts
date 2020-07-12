import { MockClient } from "../../http/MockClient";
import { GaroonRequestConfigBuilder } from "../../GaroonRequestConfigBuilder";
import { errorResponseHandler } from "../../GaroonRestAPIClient";
import { WorkflowClient } from "../WorkflowClient";
import { Status } from "../types/workflow";

describe("WorkflowClient", () => {
  let mockClient: MockClient;
  let workflowClient: WorkflowClient;

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
    workflowClient = new WorkflowClient(mockClient);
  });

  describe("getRequests", () => {
    const params = {
      limit: 100,
      offset: 0,
      fields: ["id", "number"],
      orderBy: {
        property: "createdAt" as const,
        order: "desc" as const,
      },
      rangeStartApprovedAt: "2020-01-01T00:00:00Z",
      rangeEndApprovedAt: "2020-12-30T00:00:00Z",
      form: 1,
      status: ["UNPROCESSING" as const, "IN_PROGRESS" as const],
    };
    beforeEach(async () => {
      await workflowClient.getRequests(params);
    });
    it("should pass the path to the http client", () => {
      expect(mockClient.getLogs()[0].path).toBe(
        "/api/v1/workflow/admin/requests"
      );
    });
    it("should send a get request", () => {
      expect(mockClient.getLogs()[0].method).toBe("get");
    });
    it("should pass limit, offset, fields, orderBy, rangeStartApprovedAt, rangeEndApprovedAt, form and status as a param to the http client", () => {
      expect(mockClient.getLogs()[0].params).toEqual({
        limit: 100,
        offset: 0,
        fields: "id,number",
        orderBy: "createdAt desc",
        rangeStartApprovedAt: "2020-01-01T00:00:00Z",
        rangeEndApprovedAt: "2020-12-30T00:00:00Z",
        form: 1,
        status: "UNPROCESSING,IN_PROGRESS",
      });
    });
  });
});
