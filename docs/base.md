# Base

- [getUsers](#getusers)

## Overview

```ts
const client = new GaroonRestAPIClient();

(async () => {
  try {
    console.log(await client.base.getUsers);
  } catch (error) {
    console.log(error);
  }
})();
```

- All methods are defined on the `base` property.
- This method returns a Promise object that is resolved with an object having properties in each `Returns` section.

## Methods

### getUsers

Get users specified by conditions.

#### Parameters

| Name   |  Type  | Required | Description                                                                                                                                |
| ------ | :----: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| limit  | Number |          | The number of users to retrieve.<br />Must be between `1` and `1000`.<br />If nothing is specified, it will default to `100`.              |
| offset | Number |          | The number of retrievals that will be skipped.<br />Must be between `0` and `2147483647`. If nothing is specified, it will default to `0`. |
| name   | String |          | The name for searching users.                                                                                                              |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360018124651#step1
