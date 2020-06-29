# Error Handling

## GaroonRestAPIError

When the API request responds with a status code other than 200, the client raises [`GaroonRestAPIError`](../src/GaroonRestAPIError.ts).

[`GaroonRestAPIError`](../src/GaroonRestAPIError.ts) has the following properties:

| Name      |  Type  | Description                                                |
| --------- | :----: | ---------------------------------------------------------- |
| errorCode | String | The code of the error, to specify the type of error it is. |
| status    | Number | The HTTP status of the response.                           |
| headers   | Object | The HTTP headers of the response.                          |
| message   | String | The error message.                                         |
