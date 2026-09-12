import { describe, it, expect } from "vitest";
import { buildWindingPath } from "./windingPath";

describe("buildWindingPath", () => {
  it("starts at the horizontal center and top", () => {
    const d = buildWindingPath(3, 600, 400);
    expect(d.startsWith("M 200 0")).toBe(true);
  });

  it("produces one cubic bezier segment per waypoint", () => {
    const d = buildWindingPath(4, 600, 400);
    const curveCount = d.split("C").length - 1;
    expect(curveCount).toBe(4);
  });

  it("total height matches count * segmentHeight", () => {
    const d = buildWindingPath(5, 600, 400);
    // last coordinate pair in the path should end at y = 5 * 600 = 3000
    expect(d.trim().endsWith("400 3000")).toBe(true);
  });
});
