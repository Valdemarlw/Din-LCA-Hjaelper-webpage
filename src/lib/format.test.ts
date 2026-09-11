import { describe, expect, it } from "vitest";
import { formatDanishDate, kommatal } from "./format";

describe("formatDanishDate", () => {
  it("renders ISO dates the Danish way", () => {
    expect(formatDanishDate("2026-06-22")).toBe("22. juni 2026");
    expect(formatDanishDate("2026-01-05")).toBe("5. januar 2026");
  });
  it("leaves non-ISO input untouched", () => {
    expect(formatDanishDate("juni 2026")).toBe("juni 2026");
    expect(formatDanishDate("2026-13-01")).toBe("2026-13-01");
  });
});

describe("kommatal", () => {
  it("uses a decimal comma", () => {
    expect(kommatal(6.7)).toBe("6,7");
    expect(kommatal(4)).toBe("4,0");
    expect(kommatal(3.839, 3)).toBe("3,839");
  });
});
