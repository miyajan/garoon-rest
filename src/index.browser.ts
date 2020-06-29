import "core-js/features/promise";

import { injectPlatformDeps } from "./platform/";
import * as browserDeps from "./platform/browser";

injectPlatformDeps(browserDeps);

export { GaroonRestAPIClient } from "./GaroonRestAPIClient";
