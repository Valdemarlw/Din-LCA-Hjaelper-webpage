import { describe, it, expect, vi, afterEach } from "vitest";
import { track, arealBucket } from "./analytics";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("track", () => {
  it("no-ops when window is undefined (prerender/node)", () => {
    expect(() => track("cta_clicked", { location: "hero" })).not.toThrow();
  });

  it("no-ops when window.plausible is undefined (script blocked)", () => {
    vi.stubGlobal("window", {});
    expect(() => track("contact_form_started")).not.toThrow();
  });

  it("forwards event name and props to window.plausible", () => {
    const plausible = vi.fn();
    vi.stubGlobal("window", { plausible });
    track("cta_clicked", { location: "hero", target: "/kontakt" });
    expect(plausible).toHaveBeenCalledWith("cta_clicked", {
      props: { location: "hero", target: "/kontakt" },
    });
  });

  it("omits the options object when no props are given", () => {
    const plausible = vi.fn();
    vi.stubGlobal("window", { plausible });
    track("contact_form_started");
    expect(plausible).toHaveBeenCalledWith("contact_form_started", undefined);
  });
});

describe("arealBucket", () => {
  it("buckets invalid input as ukendt", () => {
    expect(arealBucket(NaN)).toBe("ukendt");
    expect(arealBucket(0)).toBe("ukendt");
    expect(arealBucket(-5)).toBe("ukendt");
  });

  it("buckets sizes without leaking raw values", () => {
    expect(arealBucket(99)).toBe("under-100");
    expect(arealBucket(100)).toBe("100-250");
    expect(arealBucket(250)).toBe("100-250");
    expect(arealBucket(251)).toBe("251-1000");
    expect(arealBucket(1000)).toBe("251-1000");
    expect(arealBucket(1001)).toBe("over-1000");
  });
});
