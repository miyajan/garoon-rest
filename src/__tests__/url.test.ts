import { buildPath } from "../url";

describe("buildPath", () => {
  it("should build path", () => {
    expect(buildPath({ endpointName: "schedule/events/1" })).toBe(
      "/api/v1/schedule/events/1"
    );
  });
});
