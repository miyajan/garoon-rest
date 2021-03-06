import { injectPlatformDeps } from "./platform";
import * as nodeDeps from "./platform/node";

injectPlatformDeps(nodeDeps);

export { GaroonRestAPIClient } from "./GaroonRestAPIClient";
