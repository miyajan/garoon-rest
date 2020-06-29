export type EventID = string | number;

export type Event = {
  id: string;
  creator: {
    id: string;
    code: string;
    name: string;
  };
  createdAt: string;
  updater: {
    id: string;
    code: string;
    name: string;
  };
  updatedAt: string;
  eventType: string;
  eventMenu: string;
  subject: string;
  notes: string;
  visibilityType: string;
  useAttendanceCheck: boolean;
  companyInfo: {
    name: string;
    zipCode: string;
    address: string;
    route: string;
    routeTime: string;
    routeFare: string;
    phone: string;
  };
  attachments: Array<{
    id: string;
    name: string;
    contentType: string;
    size: string;
  }>;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  isAllDay: boolean;
  isStartOnly: boolean;
  originalStartTimeZone: string;
  originalEndTimeZone: string;
  attendees: Array<{
    id: string;
    code: string;
    name: string;
    type: "ORGANIZATION" | "USER";
    attendanceResponse: {
      status: "PENDING" | "ACCEPTED" | "DECLINED";
      comment: string;
    };
  }>;
  attendeesCandidate: Array<{
    id: string;
    code: string;
    name: string;
    type: "ORGANIZATION" | "USER";
  }>;
  watchers: Array<{
    id: string;
    code: string;
    name: string;
    type: "ORGANIZATION" | "USER" | "ROLE";
  }>;
  watchersCandidate: Array<{
    id: string;
    code: string;
    name: string;
    type: "ORGANIZATION" | "USER" | "ROLE";
  }>;
  facilities: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  facilitiesCandidate: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  facilityUsingPurpose: string;
  facilityReservationInfo: {
    [itemCode: string]: {
      type: "SINGLE_LINE_TEXT" | "MULTI_LINE_TEXT" | "DROP_DOWN";
      value: string;
    };
  };
  facilityUsageRequests: Array<{
    facility: {
      id: string;
      name: string;
      code: string;
    };
    status: "IN_PROGRESS" | "REJECTED" | "APPROVED";
    approvedBy: {
      id: string;
      code: string;
      name: string;
    };
    approvedDateTime: string;
  }>;
  repeatInfo: {
    type:
      | "EVERY_DAY"
      | "EVERY_WEEKDAY"
      | "EVERY_WEEK"
      | "EVERY_1STWEEK"
      | "EVERY_2NDWEEK"
      | "EVERY_3RDWEEK"
      | "EVERY_4THWEEK"
      | "EVERY_LASTWEEK"
      | "EVERY_MONTH";
    range: {
      type: "THIS_EVENT_ONLY" | "ON_AND_AFTER_THIS_EVENT" | "ALL_EVENT";
      date: string;
    };
    period: {
      start: string;
      end: string;
    };
    time: {
      start: string;
      end: string;
    };
    isAllDay: boolean;
    isStartOnly: boolean;
    timeZone: string;
    dayOfWeek: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
    dayOfMonth:
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9"
      | "10"
      | "11"
      | "12"
      | "13"
      | "14"
      | "15"
      | "16"
      | "17"
      | "18"
      | "19"
      | "20"
      | "21"
      | "22"
      | "23"
      | "24"
      | "25"
      | "26"
      | "27"
      | "28"
      | "29"
      | "30"
      | "31"
      | "EOM";
    exclusiveDateTimes: Array<{
      start: string;
      end: string;
    }>;
  };
  temporaryEventCandidates: Array<{
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
  additionalItems: {
    item: {
      value: string;
    };
  };
};
