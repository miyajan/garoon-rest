# Schedule

- [getEvent](#getevent)
- [getEvents](#getevents)
- [addEvent](#addevent)
- [updateEvent](#updateevent)
- [deleteEvent](#deleteevent)
- [searchAvailableTimes](#searchavailabletimes)
- [getFacilities](#getfacilities)
- [getFacilityGroups](#getfacilitygroups)
- [getFacilitiesByFacilityGroupID](#getfacilitiesbyfacilitygroupid)

## Overview

```ts
const client = new GaroonRestAPIClient();

(async () => {
  try {
    console.log(await client.schedule.getEvent({ id: "1" }));
  } catch (error) {
    console.log(error);
  }
})();
```

- All methods are defined on the `schedule` property.
- This method returns a Promise object that is resolved with an object having properties in each `Returns` section.

## Methods

### getEvent

Get the contents of an event by specifying the event ID.

#### Parameters

| Name |       Type       | Required | Description   |
| ---- | :--------------: | :------: | ------------- |
| id   | Number or String |   Yes    | The event ID. |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360000440583#step1

### getEvents

Get events by specifying conditions.

#### Parameters

| Name              |       Type       |          Required           | Description                                                                                                                                                          |
| ----------------- | :--------------: | :-------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit             |      Number      |                             | The number of events to retrieve.<br />Must be between `1` and `1000`.<br />If nothing is specified, it will default to `100`.                                       |
| offset            |      Number      |                             | The number of retrievals that will be skipped.<br />Must be between `0` and `2147483647`. If nothing is specified, it will default to `0`.                           |
| fields            | Array\<String\>  |                             | The response properties to get.                                                                                                                                      |
| orderBy           |      Object      |                             | An object containing data of sort settings.                                                                                                                          |
| orderBy.property  |      String      |             Yes             | The property name. Possible values are: `createdAt`, `updatedAt`, `start`. If nothing is specified, it will default to `updatedAt`.                                  |
| orderBy.order     |      String      |             Yes             | The sort order. Possible values are: `asc`, `desc`. If nothing is specified, it will default to `asc`.                                                               |
| rangeStart        |      String      |                             | The start datetime for the search. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)<br />If `rangeEnd` is specified, `rangeStart` must be before the `rangeEnd`. |
| rangeEnd          |      String      |                             | The end datetime for the search. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)<br />If `rangeStart` is specified, `rangeEnd` must be later than `rangeStart`. |
| target            | Number or String | Conditionally<br />Required | The ID of the target. Required if `targetType` is specified. If nothing is specified, it will default to the login user ID.                                          |
| targetType        |      String      | Conditionally<br />Required | The target type. Possible values are: `user`, `organization`, `facility`. Required if `target` is specified. If nothing is specified, it will default to `user`.     |
| keyword           |      String      | Conditionally<br />Required | The search keyword. The keyword is searched for subject, company information, notes and comments. Required if `excludeFromSearch` is specified.                      |
| excludeFromSearch | Array\<String\>  |                             | The specified elements are excluded from the keyword search. Possible values are: `subject`, `company`, `notes`, `comments`.                                         |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360000440583#step2

### addEvent

Add a regular or periodic event. A repeating or tentative event cannot be added by this API.

#### Parameters

| Name                       |       Type       |          Required           | Description                                                                                                                                                                |
| -------------------------- | :--------------: | :-------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventType                  |      String      |             Yes             | The event type. Possible values are: `REGULAR`, `ALL_DAY`.                                                                                                                 |
| eventMenu                  |      String      |                             | The event menu. An empty string is taken as the default setting ("-----").                                                                                                 |
| subject                    |      String      |                             | The event subject.                                                                                                                                                         |
| notes                      |      String      |                             | The event memo.                                                                                                                                                            |
| start                      |      Object      |             Yes             | An object containing data of the start datetime.                                                                                                                           |
| start.dateTime             |      String      |             Yes             | The start datetime of the event. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)                                                                                      |
| start.timeZone             |      String      |             Yes             | The timezone of the start datetime.                                                                                                                                        |
| end                        |      Object      | Conditionally<br />Required | An object containing data of the end datetime. Required if `isStartOnly` is false, `facilities` is specified, or `eventType` is `ALL_DAY`.                                 |
| end.dateTime               |      String      |             Yes             | The end datetime of the event. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)                                                                                        |
| end.timeZone               |      String      |             Yes             | The timezone of the end datetime.                                                                                                                                          |
| isAllDay                   |     Boolean      |                             | It indicates whether the event is all-day.                                                                                                                                 |
| isStartOnly                |     Boolean      | Conditionally<br />Required | It indicates whether the event has only the start datetime. If nothing is specified, it will default to `false`. It must be specified as `true` if `end` is not specified. |
| attendees                  | Array\<Object\>  | Conditionally<br />Required | The list of attendees. Required if `facilities` is not specified.                                                                                                          |
| attendees[].type           |      String      |             Yes             | The attendee type. Possible values are `ORGANIZATION`, `USER`.                                                                                                             |
| attendees[].id             | Number or String | Conditionally<br />Required | The ID of the attendee. Required if `attendees[].code` is not specified.                                                                                                   |
| attendees[].code           |      String      | Conditionally<br />Required | The code of the attendee. Required if `attendees[].id` is not specified.                                                                                                   |
| facilities                 | Array\<Object\>  | Conditionally<br />Required | The list of facilities. Required if `attendees` is not specified.                                                                                                          |
| facilities[].id            | Number or String | Conditionally<br />Required | The ID of the facility. Required if `facilities[].code` is not specified.                                                                                                  |
| facilities[].code          |      String      | Conditionally<br />Required | The code of the facility. Required if `facilities[].id` is not specified.                                                                                                  |
| facilityUsingPurpose       |      String      | Conditionally<br />Required | The purpose of the use of the facility. Required if "Facility usage request" is enabled.                                                                                   |
| companyInfo                |      Object      |                             | An object containing data of the company.                                                                                                                                  |
| companyInfo.name           |      String      |                             | The company name.                                                                                                                                                          |
| companyInfo.zipCode        |      String      |                             | The zip code of the company.                                                                                                                                               |
| companyInfo.address        |      String      |                             | The company address.                                                                                                                                                       |
| companyInfo.route          |      String      |                             | The route to the company.                                                                                                                                                  |
| companyInfo.routeTime      |      String      |                             | The time of the route.                                                                                                                                                     |
| companyInfo.routeFare      |      String      |                             | The fare of the route.                                                                                                                                                     |
| companyInfo.phone          |      String      |                             | The phone number of the company.                                                                                                                                           |
| attachments                | Array\<Object\>  |                             | The list of attachments.                                                                                                                                                   |
| attachments[].name         |      String      |                             | The name of the attachment.                                                                                                                                                |
| attachments[].content      |      String      |                             | The content of the attachment. It must be base64 string.                                                                                                                   |
| visibilityType             |      String      |                             | The visibility type. Possible values are `PUBLIC`, `PRIVATE`, `SET_PRIVATE_WATCHERS`.                                                                                      |
| useAttendanceCheck         |     Boolean      |                             | It indicates whether "Request responses" of attendees is enabled.                                                                                                          |
| watchers                   | Array\<Object\>  | Conditionally<br />Required | The list of private watchers. Required if `visibilityType` is `SET_PRIVATE_WATCHERS`.                                                                                      |
| watchers[].type            |      String      |             Yes             | The type of the watcher. Possible values are `ORGANIZATION`, `USER`, `ROLE`.                                                                                               |
| watchers[].id              | Number or String | Conditionally<br />Required | The ID of the watcher. Required if `watchers[].code` is not specified.                                                                                                     |
| watchers[].code            |      String      | Conditionally<br />Required | The code of the watcher. Required if `watchers[].id` is not specified.                                                                                                     |
| additionalItems            |      Object      |                             | An object containing data of additional items.                                                                                                                             |
| additionalItems.item.value |      String      |                             | The value of the item.                                                                                                                                                     |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360000425163#step1

### updateEvent

Update an event by specifying the event ID. A tentative event cannot be updated by this API.

#### Parameters

| Name                       |       Type       |          Required           | Description                                                                                                                                                                |
| -------------------------- | :--------------: | :-------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                         | Number or String |             Yes             | The event ID.                                                                                                                                                              |
| eventMenu                  |      String      |                             | The event menu. An empty string is taken as the default setting ("-----").                                                                                                 |
| subject                    |      String      |                             | The event subject.                                                                                                                                                         |
| notes                      |      String      |                             | The event memo.                                                                                                                                                            |
| start                      |      Object      |             Yes             | An object containing data of the start datetime.                                                                                                                           |
| start.dateTime             |      String      |             Yes             | The start datetime of the event. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)                                                                                      |
| start.timeZone             |      String      |             Yes             | The timezone of the start datetime.                                                                                                                                        |
| end                        |      Object      | Conditionally<br />Required | An object containing data of the end datetime. Required if `isStartOnly` is false, `facilities` is specified, or `eventType` is `ALL_DAY`.                                 |
| end.dateTime               |      String      |             Yes             | The end datetime of the event. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)                                                                                        |
| end.timeZone               |      String      |             Yes             | The timezone of the end datetime.                                                                                                                                          |
| isAllDay                   |     Boolean      |                             | It indicates whether the event is all-day.                                                                                                                                 |
| isStartOnly                |     Boolean      | Conditionally<br />Required | It indicates whether the event has only the start datetime. If nothing is specified, it will default to `false`. It must be specified as `true` if `end` is not specified. |
| attendees                  | Array\<Object\>  | Conditionally<br />Required | The list of attendees. Required if `facilities` is not specified.                                                                                                          |
| attendees[].type           |      String      |             Yes             | The attendee type. Possible values are `ORGANIZATION`, `USER`.                                                                                                             |
| attendees[].id             | Number or String | Conditionally<br />Required | The ID of the attendee. Required if `attendees[].code` is not specified.                                                                                                   |
| attendees[].code           |      String      | Conditionally<br />Required | The code of the attendee. Required if `attendees[].id` is not specified.                                                                                                   |
| facilities                 | Array\<Object\>  | Conditionally<br />Required | The list of facilities. Required if `attendees` is not specified.                                                                                                          |
| facilities[].id            | Number or String | Conditionally<br />Required | The ID of the facility. Required if `facilities[].code` is not specified.                                                                                                  |
| facilities[].code          |      String      | Conditionally<br />Required | The code of the facility. Required if `facilities[].id` is not specified.                                                                                                  |
| facilityUsingPurpose       |      String      | Conditionally<br />Required | The purpose of the use of the facility. Required if "Facility usage request" is enabled.                                                                                   |
| companyInfo                |      Object      |                             | An object containing data of the company.                                                                                                                                  |
| companyInfo.name           |      String      |                             | The company name.                                                                                                                                                          |
| companyInfo.zipCode        |      String      |                             | The zip code of the company.                                                                                                                                               |
| companyInfo.address        |      String      |                             | The company address.                                                                                                                                                       |
| companyInfo.route          |      String      |                             | The route to the company.                                                                                                                                                  |
| companyInfo.routeTime      |      String      |                             | The time of the route.                                                                                                                                                     |
| companyInfo.routeFare      |      String      |                             | The fare of the route.                                                                                                                                                     |
| companyInfo.phone          |      String      |                             | The phone number of the company.                                                                                                                                           |
| visibilityType             |      String      |                             | The visibility type. Possible values are `PUBLIC`, `PRIVATE`, `SET_PRIVATE_WATCHERS`.                                                                                      |
| useAttendanceCheck         |     Boolean      |                             | It indicates whether "Request responses" of attendees is enabled.                                                                                                          |
| watchers                   | Array\<Object\>  | Conditionally<br />Required | The list of private watchers. Required if `visibilityType` is `SET_PRIVATE_WATCHERS`.                                                                                      |
| watchers[].type            |      String      |             Yes             | The type of the watcher. Possible values are `ORGANIZATION`, `USER`, `ROLE`.                                                                                               |
| watchers[].id              | Number or String | Conditionally<br />Required | The ID of the watcher. Required if `watchers[].code` is not specified.                                                                                                     |
| watchers[].code            |      String      | Conditionally<br />Required | The code of the watcher. Required if `watchers[].id` is not specified.                                                                                                     |
| additionalItems            |      Object      |                             | An object containing data of additional items.                                                                                                                             |
| additionalItems.item.value |      String      |                             | The value of the item.                                                                                                                                                     |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360000495746#step1

### deleteEvent

Delete an event by specifying the event ID. If an ID of a repeating event is specified, all ranges of the event will be deleted. A tentative event cannot be deleted by this API.

#### Parameters

| Name |       Type       | Required | Description   |
| ---- | :--------------: | :------: | ------------- |
| id   | Number or String |   Yes    | The event ID. |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360000393866

### searchAvailableTimes

Search available times of users, organizations and facilities.

#### Parameters

| Name                    |       Type       |          Required           | Description                                                                                |
| ----------------------- | :--------------: | :-------------------------: | ------------------------------------------------------------------------------------------ |
| timeRanges              | Array\<Object\>  |             Yes             | The list of search time ranges.                                                            |
| timeRanges[].start      |      String      |             Yes             | The start datetime of the time range. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`) |
| timeRanges[].end        |      String      |             Yes             | The end datetime of the time range. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)   |
| timeInterval            |      Number      |             Yes             | The search time interval.                                                                  |
| attendees               | Array\<Object\>  | Conditionally<br />Required | The list of attendees. Required if `facilities` is not specified.                          |
| attendees[].type        |      String      |             Yes             | The attendee type. Possible values are `ORGANIZATION`, `USER`.                             |
| attendees[].id          | Number or String | Conditionally<br />Required | The ID of the attendee. Required if `attendees[].code` is not specified.                   |
| attendees[].code        |      String      | Conditionally<br />Required | The code of the attendee. Required if `attendees[].id` is not specified.                   |
| facilities              | Array\<Object\>  | Conditionally<br />Required | The list of facilities. Required if `attendees` is not specified.                          |
| facilities[].id         | Number or String | Conditionally<br />Required | The ID of the facility. Required if `facilities[].code` is not specified.                  |
| facilities[].code       |      String      | Conditionally<br />Required | The code of the facility. Required if `facilities[].id` is not specified.                  |
| facilitySearchCondition |      String      |                             | The facility search condition. Possible values are `AND`, `OR`.                            |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360018417771#step1

### getFacilities

Get facilities by specifying conditions.

#### Parameters

| Name   |  Type  | Required | Description                                                                                                                                |
| ------ | :----: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| limit  | Number |          | The number of facilities to retrieve.<br />Must be between `1` and `1000`.<br />If nothing is specified, it will default to `100`.         |
| offset | Number |          | The number of retrievals that will be skipped.<br />Must be between `0` and `2147483647`. If nothing is specified, it will default to `0`. |
| name   | String |          | The facility name.                                                                                                                         |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360017764211#step1

### getFacilityGroups

Get facility groups by specifying conditions.

#### Parameters

| Name   |  Type  | Required | Description                                                                                                                                |
| ------ | :----: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| limit  | Number |          | The number of facility groups to retrieve.<br />Must be between `1` and `1000`.<br />If nothing is specified, it will default to `100`.    |
| offset | Number |          | The number of retrievals that will be skipped.<br />Must be between `0` and `2147483647`. If nothing is specified, it will default to `0`. |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360017481472#step1

### getFacilitiesByFacilityGroupID

Get facilities belonging to the specified facility group.

#### Parameters

| Name   |       Type       | Required | Description                                                                                                                                |
| ------ | :--------------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| id     | Number or String |   Yes    | The facility group ID.                                                                                                                     |
| limit  |      Number      |          | The number of facilities to retrieve.<br />Must be between `1` and `1000`.<br />If nothing is specified, it will default to `100`.         |
| offset |      Number      |          | The number of retrievals that will be skipped.<br />Must be between `0` and `2147483647`. If nothing is specified, it will default to `0`. |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360017481472#step2
