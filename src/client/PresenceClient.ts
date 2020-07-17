import { HttpClient } from "../http";
import { buildPath } from "../url";

export class PresenceClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getPresenceByUserID(params: {
    id: string | number;
  }): Promise<{
    user: {
      id: string;
      name: string;
      code: string;
    };
    updatedAt: string;
    notes: string;
    status: {
      name: string;
      code: string;
    };
  }> {
    const { id } = params;
    const path = buildPath({ endpointName: `presence/users/${id}` });
    return this.client.get(path, {});
  }
}
