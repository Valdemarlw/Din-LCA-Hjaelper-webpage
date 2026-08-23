import { describe, expect, it } from "vitest";
import {
  ANALYTICS_CONSENT_KEY,
  analyticsTrafficProperties,
  readAnalyticsConsent,
  sanitizeAnalyticsProperties,
  sanitizeAnalyticsUrl,
} from "./analytics";

function storageWith(value: string | null): Pick<Storage, "getItem"> {
  return {
    getItem(key: string) {
      return key === ANALYTICS_CONSENT_KEY ? value : null;
    },
  };
}

describe("analytics consent", () => {
  it("only accepts the two explicit stored choices", () => {
    expect(readAnalyticsConsent(storageWith("granted"))).toBe("granted");
    expect(readAnalyticsConsent(storageWith("denied"))).toBe("denied");
    expect(readAnalyticsConsent(storageWith("anything else"))).toBeNull();
    expect(readAnalyticsConsent(storageWith(null))).toBeNull();
  });
});

describe("analytics properties", () => {
  it("drops fields that could contain personal or free-form data", () => {
    expect(
      sanitizeAnalyticsProperties({
        side: "/kontakt",
        placering: "footer",
        email: "kunde@example.dk",
        navn: "Kunde Navn",
        besked: "Ring til mig",
        undefinedValue: undefined,
      })
    ).toEqual({ side: "/kontakt", placering: "footer" });
  });

  it("keeps attribution parameters but removes arbitrary query data", () => {
    expect(
      sanitizeAnalyticsUrl(
        "https://dinlcahjælper.dk/kontakt?utm_source=linkedin&utm_medium=profile&dlh_verification=1&email=kunde@example.dk&token=hemmelig#formular"
      )
    ).toBe("https://xn--dinlcahjlper-edb.dk/kontakt?utm_source=linkedin&utm_medium=profile");
  });

  it("marks explicit verification sessions and persists the marker for navigation", () => {
    let storedValue: string | null = null;
    const storage: Pick<Storage, "getItem" | "setItem"> = {
      getItem() {
        return storedValue;
      },
      setItem(_key, value) {
        storedValue = value;
      },
    };

    expect(analyticsTrafficProperties("", storage)).toEqual({});
    expect(analyticsTrafficProperties("?dlh_verification=1", storage)).toEqual({
      traffic_type: "verification",
    });
    expect(analyticsTrafficProperties("", storage)).toEqual({
      traffic_type: "verification",
    });
  });
});
