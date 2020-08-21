# Notification

- [getItems](#getitems)
- [addItem](#additem)

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

### addItem

Add a notification.

#### Parameters

| Name                |       Type       |          Required           | Description                                                                        |
| ------------------- | :--------------: | :-------------------------: | ---------------------------------------------------------------------------------- |
| app                 |      String      |             Yes             | The external notification code.                                                    |
| notificationKey     |      String      |             Yes             | The notification key.                                                              |
| operation           |      String      |             Yes             | The operation of the notification. Possible values are: `add`, `modify`, `remove`. |
| url                 |      String      |             Yes             | The notification URL.                                                              |
| title               |      String      |             Yes             | The notification title.                                                            |
| body                |      String      |             Yes             | The notification body.                                                             |
| icon                |      String      |                             | The notification icon URL.                                                         |
| destinations        | Array\<Object\>  |             Yes             | The list of the notification destinations.                                         |
| destinations[].type |      String      |             Yes             | The destination type. Possible value is: `USER`.                                   |
| destinations[].id   | String or Number | Conditionally<br />Required | The ID of the destination. Required if `destinations[].code` is not specified.     |
| destinations[].code |      String      | Conditionally<br />Required | The code of the destination. Required if `destinations[].id` is not specified.     |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360017482672#step1
