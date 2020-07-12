import { HttpClient } from "../http";
import { Item, Operation, Status } from "./types";
import { buildPath } from "../url";

export class WorkflowClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getRequests(params?: {
    limit?: number;
    offset?: number;
    fields?: string[];
    orderBy?: {
      property: "createdAt";
      order: "asc" | "desc";
    };
    rangeStartApprovedAt?: string;
    rangeEndApprovedAt?: string;
    form?: string | number;
    status?: Status[];
  }): Promise<{
    requests: Array<{
      id: string;
      status: {
        name: string;
        type: Status;
      };
      createdAt: string;
      processingStepCode: string;
      name: string;
      number: string;
      isUrgent: boolean;
      applicant: {
        id: string;
        code: string;
        name: string;
        proxy?: {
          id: string;
          code: string;
          name: string;
        };
      };
      form: {
        id: string;
        name: string;
      };
      items: {
        [itemCode: string]: Item;
      };
      steps: {
        [stepCode: string]: {
          id: string;
          name: string;
          requirement: string;
          isApprovalStep: 0 | 1;
          processors: Array<{
            id: string;
            code: string;
            name: string;
            result: string;
            date: string;
            comment: string;
            proxy: {
              id: string;
              code: string;
              name: string;
            };
          }>;
        };
      };
      availableOperations: {
        list: Operation[];
        sentBackTargets: string[];
      };
      folder: Array<{
        id: string;
        type: "UNPROCESSED" | "SENT" | "RECEIVED" | "DRAFT" | "FINISH";
      }>;
    }>;
  }> {
    const path = buildPath({ endpointName: "workflow/admin/requests" });

    if (!params) {
      return this.client.get(path, {});
    }

    const { fields, orderBy, status, ...rest } = params;
    const data: Record<string, unknown> = rest as Record<string, unknown>;
    if (fields) {
      data.fields = fields.join(",");
    }
    if (orderBy) {
      data.orderBy = `${orderBy.property} ${orderBy.order}`;
    }
    if (status) {
      data.status = status.join(",");
    }
    return this.client.get(path, data);
  }
}
