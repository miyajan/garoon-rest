import { HttpClient } from "../http";
import { buildPath } from "../url";

export class NotificationClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getItems(params?: {
    limit?: number;
    offset?: number;
    fields?: string[];
  }): Promise<{
    items: Array<{
      moduleId: string;
      creator: {
        id: string;
        code: string;
        name: string;
      };
      createdAt: string;
      operation: "add" | "modify" | "remove";
      url: string;
      title: string;
      body: string;
      icon: string;
      isRead: boolean;
    }>;
    hasNext: boolean;
  }> {
    const path = buildPath({ endpointName: `notification/items` });

    if (!params) {
      return this.client.get(path, {});
    }

    const { fields, ...rest } = params;
    const data: Record<string, unknown> = rest as Record<string, unknown>;
    if (fields) {
      data.fields = fields.join(",");
    }
    return this.client.get(path, data);
  }
}
