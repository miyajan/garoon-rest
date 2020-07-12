# Workflow

- [getRequests](#getrequests)

## Overview

```ts
const client = new GaroonRestAPIClient();

(async () => {
  try {
    console.log(await client.workflow.getRequests());
  } catch (error) {
    console.log(error);
  }
})();
```

- All methods are defined on the `workflow` property.
- This method returns a Promise object that is resolved with an object having properties in each `Returns` section.

## Methods

### getRequests

Get the all request data.

#### Parameters

| Name                 |       Type       | Required | Description                                                                                                                                                                                                   |
| -------------------- | :--------------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit                |      Number      |          | The number of requests to retrieve.<br />Must be between `1` and `1000`.<br />If nothing is specified, it will default to `100`.                                                                              |
| offset               |      Number      |          | The number of retrievals that will be skipped.<br />Must be between `0` and `2147483647`. If nothing is specified, it will default to `0`.                                                                    |
| fields               | Array\<String\>  |          | The response properties to get.                                                                                                                                                                               |
| orderBy              |      Object      |          | An object containing data of sort settings.                                                                                                                                                                   |
| orderBy.property     |      String      |   Yes    | The property name. Possible values are: `createdAt`. If nothing is specified, it will default to `createdAt`.                                                                                                 |
| orderBy.order        |      String      |   Yes    | The sort order. Possible values are: `asc`, `desc`. If nothing is specified, it will default to `asc`.                                                                                                        |
| rangeStartApprovedAt |      String      |          | The start approved datetime for the search. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)<br />If `rangeEndApprovedAt` is specified, `rangeStartApprovedAt` must be before the `rangeEndApprovedAt`.   |
| rangeEndApprovedAt   |      String      |          | The end approved datetime for the search. The format is RFC3339. (e.g. `2020-01-01T00:00:00Z`)<br />If `rangeStartApprovedAt` is specified, `rangeEndApprovedAt` must be later than `rangeStartApprovedAt`.   |
| form                 | Number or String |          | The form ID.                                                                                                                                                                                                  |
| status               | Array\<String\>  |          | The request status. Possible values are: `UNPROCESSING`, `IN_PROGRESS`, `REJECTED`, `WITHDRAWN`, `SENT_BACK`, `CANCELLED`, `APPROVED`, `COMPLETED`. If nothing is specified, it will default to all statuses. |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360031071011#step1
