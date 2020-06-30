# Schedule

- [getEvent](#getevent)

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
| target            | Number or String | Conditionally<br />Required | The ID of an user or an organization or a facility. Required if `targetType` is specified. If nothing is specified, it will default to the login user ID.            |
| targetType        |      String      | Conditionally<br />Required | The target type. Possible values are: `user`, `organization`, `facility`. Required if `target` is specified. If nothing is specified, it will default to `user`.     |
| keyword           |      String      | Conditionally<br />Required | The search keyword. The keyword is searched for subject, company information, notes and comments. Required if `excludeFromSearch` is specified.                      |
| excludeFromSearch | Array\<String\>  |                             | The specified elements are excluded from the keyword search. Possible values are: `subject`, `company`, `notes`, `comments`.                                         |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360000440583#step2
