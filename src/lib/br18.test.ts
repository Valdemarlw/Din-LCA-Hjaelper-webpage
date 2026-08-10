import { describe, it, expect } from "vitest";
import { evaluateBR18, prisTypeFor, type BR18Input } from "./br18";

function input(p: Partial<BR18Input>): BR18Input {
  return {
    bygningstype: "enfamiliehus",
    byggeri: "nybyggeri",
    m2: 150,
    uopvarmet: false,
    samfundskritisk: false,
    ...p,
  };
}

describe("evaluateBR18", () => {
  it("uopvarmet under 50 m² -> helt undtaget", () => {
    expect(evaluateBR18(input({ uopvarmet: true, m2: 40, bygningstype: "lager" })).status).toBe(
      "undtaget_helt"
    );
  });

  it("uopvarmet 60 m² -> ikke undtaget pga. størrelse", () => {
    expect(
      evaluateBR18(input({ uopvarmet: true, m2: 60, bygningstype: "lager" })).status
    ).not.toBe("undtaget_helt");
  });

  it("tilbygning enfamilie 200 m² -> undtaget (bagatelgrænse)", () => {
    expect(evaluateBR18(input({ byggeri: "tilbygning", m2: 200 })).status).toBe(
      "undtaget_tilbygning"
    );
  });

  it("tilbygning enfamilie 300 m² -> lovpligtig 6,7", () => {
    const r = evaluateBR18(input({ byggeri: "tilbygning", m2: 300 }));
    expect(r.status).toBe("lovpligtig");
    expect(r.graensevaerdi).toBe(6.7);
  });

  it("rækkehus følger boligreglerne, men får manuel pris", () => {
    const underBagatel = evaluateBR18(
      input({ bygningstype: "raekkehus", byggeri: "tilbygning", m2: 200 })
    );
    const nybyggeri = evaluateBR18(input({ bygningstype: "raekkehus", m2: 300 }));

    expect(underBagatel.status).toBe("undtaget_tilbygning");
    expect(nybyggeri.graensevaerdi).toBe(6.7);
    expect(prisTypeFor("raekkehus")).toBe("raekkehus");
  });

  it("tilbygning erhverv 30 m² -> lovpligtig (ingen bagatel) 7,5", () => {
    const r = evaluateBR18(input({ byggeri: "tilbygning", m2: 30, bygningstype: "kontor" }));
    expect(r.status).toBe("lovpligtig");
    expect(r.graensevaerdi).toBe(7.5);
  });

  it("etagebolig-tilbygning -> lovpligtig (IKKE bagatel-undtaget) 7,5", () => {
    const r = evaluateBR18(input({ byggeri: "tilbygning", m2: 100, bygningstype: "etagebolig" }));
    expect(r.status).toBe("lovpligtig");
    expect(r.graensevaerdi).toBe(7.5);
  });

  it("sommerhus 120 m² -> 4,0 ; 180 m² -> 6,7", () => {
    expect(evaluateBR18(input({ bygningstype: "sommerhus", m2: 120 })).graensevaerdi).toBe(4.0);
    expect(evaluateBR18(input({ bygningstype: "sommerhus", m2: 180 })).graensevaerdi).toBe(6.7);
  });

  it("samfundskritisk -> kun_dokumentation, ingen grænseværdi", () => {
    const r = evaluateBR18(input({ bygningstype: "andet", samfundskritisk: true }));
    expect(r.status).toBe("kun_dokumentation");
    expect(r.graensevaerdi).toBeNull();
    expect(r.a4a5).toBeNull();
  });

  it("lovpligtige har A4/A5-grænse 1,5", () => {
    expect(evaluateBR18(input({})).a4a5).toBe(1.5);
  });

  it("institution + andet -> 8,0", () => {
    expect(evaluateBR18(input({ bygningstype: "institution" })).graensevaerdi).toBe(8.0);
    expect(evaluateBR18(input({ bygningstype: "andet" })).graensevaerdi).toBe(8.0);
  });
});

describe("prisTypeFor", () => {
  it("mapper bygningstyper til pris-buckets", () => {
    expect(prisTypeFor("enfamiliehus")).toBe("enfamiliehus");
    expect(prisTypeFor("sommerhus")).toBe("sommerhus");
    expect(prisTypeFor("lager")).toBe("lager");
    expect(prisTypeFor("andet")).toBe("lager");
    expect(prisTypeFor("etagebolig")).toBe("kontor");
    expect(prisTypeFor("kontor")).toBe("kontor");
    expect(prisTypeFor("handel")).toBe("kontor");
    expect(prisTypeFor("institution")).toBe("kontor");
  });
});
