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
    const data: Record<string, unknown> = rest as Record<string, unknown>;
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
      code?: string;
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
        code?: string;
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

  public async deleteEvent(params: { id: EventID }): Promise<void> {
    const { id } = params;
    const path = buildPath({ endpointName: `schedule/events/${id}` });
    await this.client.delete(path, {});
  }

  public searchAvailableTimes(params: {
    timeRanges: Array<{
      start: string;
      end: string;
    }>;
    timeInterval: number;
    attendees?: Array<{
      type: "ORGANIZATION" | "USER";
      id?: string | number;
      code?: string;
    }>;
    facilities?: Array<{
      id?: string | number;
      code?: string;
    }>;
    facilitySearchCondition?: "AND" | "OR";
  }): Promise<{
    availableTimes: Array<{
      start: {
        dateTime: string;
        timeZone: string;
      };
      end: {
        dateTime: string;
        timeZone: string;
      };
      facility: {
        id: string;
        code: string;
        name: string;
      };
    }>;
  }> {
    const path = buildPath({ endpointName: "schedule/searchAvailableTimes" });
    return this.client.post(path, params);
  }

  public getFacilities(params?: {
    limit?: number;
    offset?: number;
    name?: string;
  }): Promise<{
    facilities: Array<{
      id: string;
      name: string;
      code: string;
      notes: string;
      facilityGroup: string;
    }>;
    hasNext: boolean;
  }> {
    const path = buildPath({ endpointName: "schedule/facilities" });
    return this.client.get(path, params ?? {});
  }

  public getFacilityGroups(params?: {
    limit?: number;
    offset?: number;
  }): Promise<{
    facilityGroups: Array<{
      id: string;
      name: string;
      code: string;
      notes: string;
      parentFacilityGroup: string | null;
      childFacilityGroups: Array<{
        id: string;
      }>;
    }>;
    hasNext: boolean;
  }> {
    const path = buildPath({ endpointName: "schedule/facilityGroups" });
    return this.client.get(path, params ?? {});
  }

  public getFacilitiesByFacilityGroupID(params: {
    id: string | number;
    limit?: number;
    offset?: number;
  }): Promise<{
    facilities: Array<{
      id: string;
      name: string;
      code: string;
      notes: string;
      facilityGroup: string;
    }>;
  }> {
    const { id, ...rest } = params;
    const path = buildPath({
      endpointName: `schedule/facilityGroups/${id}/facilities`,
    });
    return this.client.get(path, rest as Record<string, unknown>);
  }
}
