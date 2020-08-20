# Notification

- [getItems](#getitems)

## Overview

```ts
const client = new GaroonRestAPIClient();

(async () => {
  try {
    console.log(await client.notification.getItems());
  } catch (error) {
    console.log(error);
  }
})();
```

- All methods are defined on the `notification` property.
- This method returns a Promise object that is resolved with an object having properties in each `Returns` section.

## Methods

### getItems

Get unread notifications.

#### Parameters

| Name   |      Type       | Required | Description                                                                                                                                |
| ------ | :-------------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| limit  |     Number      |          | The number of notifications to retrieve.<br />Must be between `1` and `1000`.<br />If nothing is specified, it will default to `100`.      |
| offset |     Number      |          | The number of retrievals that will be skipped.<br />Must be between `0` and `2147483647`. If nothing is specified, it will default to `0`. |
| fields | Array\<String\> |          | The response properties in `items` property to get.                                                                                        |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360017764051#step1
