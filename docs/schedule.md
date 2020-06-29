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
