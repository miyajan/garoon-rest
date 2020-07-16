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
    hasNext: boolean;
  }> {
    const path = buildPath({ endpointName: "base/users" });
    return this.client.get(path, params ?? {});
  }

  public getOrganizations(params?: {
    limit?: number;
    offset?: number;
    name?: string;
  }): Promise<{
    organizations: Array<{
      id: string;
      name: string;
      code: string;
      parentOrganization: string;
      childOrganizations: Array<{ id: string }>;
    }>;
    hasNext: boolean;
  }> {
    const path = buildPath({ endpointName: "base/organizations" });
    return this.client.get(path, params ?? {});
  }
}
