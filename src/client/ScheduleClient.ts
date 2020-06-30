import { HttpClient } from "../http";
import { Event, EventID, ExcludeFromSearchElement, TargetID } from "./types";
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

  public getEvents(params?: {
    limit?: number;
    offset?: number;
    fields?: string[];
    orderBy?: {
      property: "createdAt" | "updatedAt" | "start";
      order: "asc" | "desc";
    };
    rangeStart?: string;
    rangeEnd?: string;
    target?: TargetID;
    targetType?: "user" | "organization" | "facility";
    keyword?: string;
    excludeFromSearch?: ExcludeFromSearchElement[];
  }): Promise<{ events: Event[] }> {
    const path = buildPath({ endpointName: "schedule/events" });

    if (!params) {
      return this.client.get(path, {});
    }

    const { fields, orderBy, excludeFromSearch, ...rest } = params;
    const data: any = rest;
    if (fields) {
      data.fields = fields.join(",");
    }
    if (orderBy) {
      data.orderBy = `${orderBy.property} ${orderBy.order}`;
    }
    if (excludeFromSearch) {
      data.excludeFromSearch = excludeFromSearch.join(",");
    }
    return this.client.get(path, data);
  }
}
