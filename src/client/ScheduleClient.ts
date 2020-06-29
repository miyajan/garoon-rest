import { HttpClient } from "../http";
import { Event, EventID } from "./types";
import { buildPath } from "../url";

export class ScheduleClient {
  private readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getEvent(params: { id: EventID }): Promise<Event> {
    const { id } = params;
    const path = buildPath({
      endpointName: `schedule/events/${id}`,
    });
    return this.client.get(path, {});
  }
}
