import { describe, it, expect } from "vitest";
import { beregnPris } from "./pris";

describe("beregnPris", () => {
  it("enfamiliehus checkpoints (Komplet)", () => {
    expect(beregnPris("enfamiliehus", 60)).toMatchObject({ komplet: 4700 });
    expect(beregnPris("enfamiliehus", 100)).toMatchObject({ komplet: 5500 });
    expect(beregnPris("enfamiliehus", 150)).toMatchObject({ komplet: 5900 });
    expect(beregnPris("enfamiliehus", 200)).toMatchObject({ komplet: 6300 });
    expect(beregnPris("enfamiliehus", 250)).toMatchObject({ komplet: 6700 });
  });

  it("lager checkpoints", () => {
    expect(beregnPris("lager", 60)).toMatchObject({ komplet: 5100 });
    expect(beregnPris("lager", 100)).toMatchObject({ komplet: 5800 });
    expect(beregnPris("lager", 250)).toMatchObject({ komplet: 7500 });
    // Morten lagerhal 478 m² -> 9.300 (fra prisformel-noten)
    expect(beregnPris("lager", 478)).toMatchObject({ komplet: 9300 });
  });

  it("kontor er lineær og rammer loftet ved ~250 m²", () => {
    expect(beregnPris("kontor", 100)).toMatchObject({ komplet: 8000 });
    expect(beregnPris("kontor", 250)).toMatchObject({ komplet: 12500 });
    expect(beregnPris("kontor", 300)).toEqual({ type: "individuelt" });
  });

  it("bolig over loftet (~410 m²) -> individuelt", () => {
    expect(beregnPris("enfamiliehus", 478)).toEqual({ type: "individuelt" });
  });

  it("Direkte = Komplet - 1000, men aldrig under gulv 4.000", () => {
    expect(beregnPris("enfamiliehus", 100)).toMatchObject({ komplet: 5500, direkte: 4500 });
    // 4700 - 1000 = 3700 -> løftes til gulvet 4000
    expect(beregnPris("enfamiliehus", 60)).toMatchObject({ komplet: 4700, direkte: 4000 });
  });

  it("gulvet 4.000 gælder også Komplet-prisen (ikke kun Direkte)", () => {
    // 10 m² enfamiliehus: raw 3.700 -> løftes til gulvet 4.000
    expect(beregnPris("enfamiliehus", 10)).toMatchObject({ komplet: 4000, direkte: 4000 });
  });

  it("sommerhus = enfamiliehus (paritet)", () => {
    expect(beregnPris("sommerhus", 94)).toEqual(beregnPris("enfamiliehus", 94));
    // Ternedalen 94 m² sommerhus -> 5.400
    expect(beregnPris("sommerhus", 94)).toMatchObject({ komplet: 5400 });
  });
});
