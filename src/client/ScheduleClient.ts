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

  public addEvent(params: {
    eventType: "REGULAR" | "ALL_DAY";
    eventMenu?: string;
    subject?: string;
    notes?: string;
    start: {
      dateTime: string;
      timeZone: string;
    };
    end?: {
      dateTime: string;
      timeZone: string;
    };
    isAllDay?: boolean;
    isStartOnly?: boolean;
    attendees?: Array<{
      type: "ORGANIZATION" | "USER";
      id?: string | number;
      code?: string;
    }>;
    facilities?: Array<{
      id?: string | number;
      code?: string;
    }>;
    facilityUsingPurpose?: string;
    companyInfo?: {
      name?: string;
      zipCode?: string;
      address?: string;
      route?: string;
      routeTime?: string;
      routeFare?: string;
      phone?: string;
    };
    attachments?: Array<{
      name?: string;
      content?: string;
    }>;
    visibilityType?: "PUBLIC" | "PRIVATE" | "SET_PRIVATE_WATCHERS";
    useAttendanceCheck?: boolean;
    watchers?: Array<{
      type: "ORGANIZATION" | "USER" | "ROLE";
      id?: string | number;
      code?: string | number;
    }>;
    additionalItems?: {
      item?: {
        value?: string;
      };
    };
  }): Promise<Event> {
    const path = buildPath({ endpointName: "schedule/events" });
    return this.client.post(path, params);
  }

  public updateEvent(params: {
    id: EventID;
    event: {
      eventMenu?: string;
      subject?: string;
      notes?: string;
      start: {
        dateTime: string;
        timeZone: string;
      };
      end?: {
        dateTime: string;
        timeZone: string;
      };
      isAllDay?: boolean;
      isStartOnly?: boolean;
      attendees?: Array<{
        type: "ORGANIZATION" | "USER";
        id?: string | number;
        code?: string;
      }>;
      facilities?: Array<{
        id?: string | number;
        code?: string;
      }>;
      facilityUsingPurpose?: string;
      companyInfo?: {
        name?: string;
        zipCode?: string;
        address?: string;
        route?: string;
        routeTime?: string;
        routeFare?: string;
        phone?: string;
      };
      visibilityType?: "PUBLIC" | "PRIVATE" | "SET_PRIVATE_WATCHERS";
      useAttendanceCheck?: boolean;
      watchers?: Array<{
        type: "ORGANIZATION" | "USER" | "ROLE";
        id?: string | number;
        code?: string | number;
      }>;
      additionalItems?: {
        item?: {
          value?: string;
        };
      };
    };
  }): Promise<Event> {
    const { id, event } = params;
    const path = buildPath({ endpointName: `schedule/events/${id}` });
    return this.client.patch(path, event);
  }
}
