# Presence

- [getPresenceByUserID](#getpresencebyuserid)

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

Get the presence information specified by the user id.

#### Parameters

| Name |       Type       | Required | Description  |
| ---- | :--------------: | :------: | ------------ |
| id   | Number or String |   Yes    | The user ID. |

#### Returns

See the example response in the `Reference`.

#### Reference

- https://developer.cybozu.io/hc/ja/articles/360026939891#step1
