# garoon-rest

[![npm version](https://badge.fury.io/js/%40miyajan%2Fgaroon-rest.svg)](https://badge.fury.io/js/%40miyajan%2Fgaroon-rest)

Rest API Client for Garoon

WIP.

## Installation

### 1. Install with `npm`

This library is distributed on `npm`.

```shell
npm install @miyajan/garoon-rest
```

You can then use `require` or `import` to import the library.

```javascript
// CommonJS
const { GaroonRestAPIClient } = require("@miyajan/garoon-rest");
// ES modules
import { GaroonRestAPIClient } from "@miyajan/garoon-rest";
```

### 2. UMD files (for browser environment)

This library also provides two Universal Module Definition (UMD) files:

- https://unpkg.com/@miyajan/garoon-rest@latest/umd/GaroonRestAPIClient.js
- minified one: https://unpkg.com/@miyajan/garoon-rest@latest/umd/GaroonRestAPIClient.min.js

After loading this, you can use `GaroonRestAPIClient` directly.
In Garoon customization, please add this URL in "JavaScript and CSS customization" setting.

NOTE: The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is unstable, it shifts as we release new versions. You should consider pointing to a specific version, such as [`1.0.0`](https://unpkg.com/@miyajan/garoon-rest@1.0.0/umd/GaroonRestAPIClient.js).

## Usage

Here is a sample code that retrieves a schedule event.

```js
const client = new GaroonRestAPIClient({
  baseUrl: "https://example.cybozu.com/g",
  // Use password authentication
  auth: {
    username: process.env.GAROON_USERNAME,
    password: process.env.GAROON_PASSWORD,
  },
  // Use OAuth token authentication
  // auth: { oAuthToken: process.env.GAROON_OAUTH_TOKEN }

  // Use session authentication if `auth` is omitted (in browser only)
});

client.schedule
  .getEvent({ id: "1" })
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Parameters for `GaroonRestAPIClient`

| Name                       |                               Type                               |          Required           | Description                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------- | :--------------------------------------------------------------: | :-------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseUrl                    |                              String                              | Conditionally<br />Required | The base URL for your Garoon environment.<br />On cybozu.com, it must end with `/g`. (e.g. https://example.cybozu.com/g) <br />If you use on-premise Garoon environment, it must end with `grn.cgi` or `grn.exe` (e.g. http://example.com/cgi-bin/cbgrn/grn.cgi) <br />Required in Node.js environment. If you omit it in browser environment, the base URL will be determined from `location`. |
| auth                       |                              Object                              | Conditionally<br />Required | The object for authentication. See [Authentication](#Authentication).                                                                                                                                                                                                                                                                                                                           |
| basicAuth                  |                              Object                              |                             | If your Garoon environment uses Basic authentication, please specify its username and password.                                                                                                                                                                                                                                                                                                 |
| basicAuth.username         |                              String                              |                             | The username of Basic authentication.                                                                                                                                                                                                                                                                                                                                                           |
| basicAuth.password         |                              String                              |                             | The password of Basic authentication.                                                                                                                                                                                                                                                                                                                                                           |
| clientCertAuth             |                              Object                              |                             | **This parameter is available only in Node.js environment.**<br />If your Garoon environment uses [Client Certificate authentication](https://jp.cybozu.help/general/en/admin/list_security/list_secureaccess/overview.html), please specify the certificate file and password.                                                                                                                 |
| clientCertAuth.pfx         | [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) |                             | The [client certificate file](https://jp.cybozu.help/general/en/user/list_access/remote/webbrowser.html). Required, unless you specify `pfxFilePath`.                                                                                                                                                                                                                                           |
| clientCertAuth.pfxFilePath |                              String                              |                             | The path to [client certificate file](https://jp.cybozu.help/general/en/user/list_access/remote/webbrowser.html). Required, unless you specify `pfx`.                                                                                                                                                                                                                                           |
| clientCertAuth.password    |                              String                              |                             | The password of client certificate.                                                                                                                                                                                                                                                                                                                                                             |
| proxy                      |                              Object                              |                             | **This parameter is available only in Node.js environment.**<br />If you use a proxy, please specify its configuration.                                                                                                                                                                                                                                                                         |
| proxy.host                 |                              String                              |                             | The host of the proxy server.                                                                                                                                                                                                                                                                                                                                                                   |
| proxy.port                 |                              Number                              |                             | The port of the proxy server.                                                                                                                                                                                                                                                                                                                                                                   |
| proxy.auth                 |                              Object                              |                             | If the proxy server requires Basic authentication, please specify its username and password.                                                                                                                                                                                                                                                                                                    |
| proxy.auth.username        |                              String                              |                             | The username of Basic authentication for the proxy server.                                                                                                                                                                                                                                                                                                                                      |
| proxy.auth.password        |                              String                              |                             | The password of Basic authentication for the proxy server.                                                                                                                                                                                                                                                                                                                                      |

### Authentication

The client supports three authentication methods:

1. [Password authentication](https://developer.cybozu.io/hc/ja/articles/360000503306-Garoon-REST-API%E3%81%AE%E5%85%B1%E9%80%9A%E4%BB%95%E6%A7%98#step2)
2. [OAuth authentication](https://developer.cybozu.io/hc/ja/articles/360015955171)
3. [Session authentication](https://developer.cybozu.io/hc/ja/articles/360000503306-Garoon-REST-API%E3%81%AE%E5%85%B1%E9%80%9A%E4%BB%95%E6%A7%98#step2)

The required parameters inside `auth` are different by the methods.
The client determines which method to use by passed parameters.

#### 1. Parameters for [Password authentication](https://developer.cybozu.io/hc/ja/articles/360000503306-Garoon-REST-API%E3%81%AE%E5%85%B1%E9%80%9A%E4%BB%95%E6%A7%98#step2)

| Name     |  Type  | Required | Description |
| -------- | :----: | :------: | ----------- |
| username | String |   Yes    |
| password | String |   Yes    |

#### 2. Parameters for [OAuth authentication](https://developer.cybozu.io/hc/ja/articles/360015955171)

| Name       |  Type  | Required | Description                                                                                                              |
| ---------- | :----: | :------: | ------------------------------------------------------------------------------------------------------------------------ |
| oAuthToken | String |   Yes    | An OAuth access token you get through the [OAuth process flow](https://developer.cybozu.io/hc/ja/articles/360015955171). |

#### 3. [Session authentication](https://developer.cybozu.io/hc/ja/articles/360000503306-Garoon-REST-API%E3%81%AE%E5%85%B1%E9%80%9A%E4%BB%95%E6%A7%98#step2)

Supported in browser environment only.
If you omit `auth` parameter, the client uses Session authentication.

## Error Handling

See [Error Handling](https://github.com/miyajan/garoon-rest/tree/master/docs/errorHandling.md)

## References

- [Schedule](https://github.com/miyajan/garoon-rest/tree/master/docs/schedule.md)

## Contribution Guide

- [CONTRIBUTING.md](https://github.com/miyajan/garoon-rest/tree/master/CONTRIBUTING.md)

## License

- [MIT](https://github.com/miyajan/garoon-rest/tree/master/LICENSE)

## Disclaimer

This OSS is my own personal work and does not have any relationship with Cybozu Inc. or any other organization which I belong to.
