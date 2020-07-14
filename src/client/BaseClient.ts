import { HttpClient } from "../http";
import { buildPath } from "../url";

export class BaseClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getUsers(params?: {
    limit?: number;
    offset?: number;
    name?: string;
  }): Promise<{
    users: Array<{
      id: string;
      name: string;
      code: string;
    }>;
  }> {
    const path = buildPath({ endpointName: "base/users" });
    return this.client.get(path, params ?? {});
  }
}
