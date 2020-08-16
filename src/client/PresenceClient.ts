import { HttpClient } from "../http";
import { Presence } from "./types";
import { buildPath } from "../url";

export class PresenceClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getPresenceByUserID(params: {
    id: string | number;
  }): Promise<Presence> {
    const { id } = params;
    const path = buildPath({ endpointName: `presence/users/${id}` });
    return this.client.get(path, {});
  }

  public getPresenceByUserCode(params: { code: string }): Promise<Presence> {
    const { code } = params;
    const path = buildPath({ endpointName: `presence/users/code/${code}` });
    return this.client.get(path, {});
  }

  public updatePresenceByUserID(params: {
    id: string | number;
    status?: {
      code?: string;
    };
    notes?: string;
  }): Promise<Presence> {
    const { id, ...rest } = params;
    const path = buildPath({ endpointName: `presence/users/${id}` });
    const data = (rest as unknown) as Record<string, unknown>;
    return this.client.patch(path, data);
  }

  public updatePresenceByUserCode(params: {
    code: string;
    status?: {
      code?: string;
    };
    notes?: string;
  }): Promise<Presence> {
    const { code, ...rest } = params;
    const path = buildPath({ endpointName: `presence/users/code/${code}` });
    const data = (rest as unknown) as Record<string, unknown>;
    return this.client.patch(path, data);
  }
}
