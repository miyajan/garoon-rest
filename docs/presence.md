# Presence

- [getPresenceByUserID](#getpresencebyuserid)
- [getPresenceByUserCode](#getpresencebyusercode)
- [updatePresenceByUserID](#updatepresencebyuserid)
- [updatePresenceByUserCode](#updatepresencebyusercode)

## Overview

```ts
const client = new GaroonRestAPIClient();

(async () => {
  try {
    console.log(await client.presence.getPresenceByUserID({ id: 1 }));
  } catch (error) {
    console.log(error);
  }
})();
```

- All methods are defined on the `presence` property.
- This method returns a Promise object that is resolved with an object having properties in each `Returns` section.

## Methods

### getPresenceByUserID

Get the presence information specified by the user ID.

#### Parameters

| Name |       Type       | Required | Description  |
| ---- | :--------------: | :------: | ------------ |
| id   | Number or String |   Yes    | The user ID. |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360026939891#step1

### getPresenceByUserCode

Get the presence information specified by the code of the user.

#### Parameters

| Name |  Type  | Required | Description           |
| ---- | :----: | :------: | --------------------- |
| code | String |   Yes    | The code of the user. |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360026939891#step2

### updatePresenceByUserID

Update the presence information specified by the user ID.

#### Parameters

| Name        |       Type       | Required | Description                                  |
| ----------- | :--------------: | :------: | -------------------------------------------- |
| id          | Number or String |   Yes    | The user ID.                                 |
| status      |      Object      |          | An object containing data of the status.     |
| status.code |      String      |          | The status code of the presence information. |
| notes       |      String      |          | The memo.                                    |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360026939911#step1

### updatePresenceByUserCode

Update the presence information specified by the user code.

#### Parameters

| Name        |  Type  | Required | Description                                  |
| ----------- | :----: | :------: | -------------------------------------------- |
| code        | String |   Yes    | The user code.                               |
| status      | Object |          | An object containing data of the status.     |
| status.code | String |          | The status code of the presence information. |
| notes       | String |          | The memo.                                    |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360026939911#step2
