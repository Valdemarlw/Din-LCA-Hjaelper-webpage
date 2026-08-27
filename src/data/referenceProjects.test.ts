import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { getReferenceProject } from "./referenceProjects";

function serializedProject(slug: string): string {
  const project = getReferenceProject(slug);
  expect(project, `missing reference project: ${slug}`).toBeDefined();
  return JSON.stringify(project);
}

function readTextFilesRecursively(directory: string): string {
  return readdirSync(directory)
    .flatMap((name) => {
      const path = join(directory, name);
      if (statSync(path).isDirectory()) return readTextFilesRecursively(path);
      if (name.endsWith(".test.ts") || !/\.(?:ts|tsx|txt|html|json)$/.test(name)) return "";
      return readFileSync(path, "utf-8");
    })
    .join("\n");
}

describe("documented website cases", () => {
  it("publishes the complete Ternedalen calculation journey and caveats", () => {
    const project = getReferenceProject("ternedalen-42");
    const content = serializedProject("ternedalen-42");

    for (const value of ["6,88", "4,38", "3,9837", "3,839", "4,0", "0,161"]) {
      expect(content).toContain(value);
    }
    expect(content).toContain("beregnings- og optimeringsrejse");
    expect(content).toContain("A5");
    expect(content).toContain("vinduesudskiftning");
    expect(project?.statusTone).toBe("info");
    expect(project?.status).toContain("Under grænsen, tidlig fase");
  });

  it("does not publish the Mørkdalvej internal QA case anywhere", () => {
    expect(getReferenceProject("moerkdalvej-6")).toBeUndefined();

    const root = join(__dirname, "..", "..");
    const publicText = readTextFilesRecursively(join(root, "public"));
    const sourceText = readTextFilesRecursively(join(root, "src"));
    const liveText = `${publicText}\n${sourceText}`.toLocaleLowerCase("da-DK");

    for (const forbidden of [
      "mørkdalvej",
      "moerkdalvej",
      "qa rettede en for lav lca-beregning",
      "historisk qa-vintage",
      "qa-korrigeret",
      "5,8677",
      "5,9227",
      "0,0550",
      "11,362923",
      "1,4762088",
      "919,555065",
      "572,24832",
    ]) {
      expect(liveText).not.toContain(forbidden);
    }
  });

  it("keeps Agavevej as an early hotspot case without a claimed final result", () => {
    const content = serializedProject("agavevej-4a");

    for (const value of ["5,87", "2,52", "43 %", "1,10", "19 %", "0,59", "10 %", "72 %"]) {
      expect(content).toContain(value);
    }
    for (const stale of [
      "3" + ",538",
      "40" + "% reduktion",
      "Bestået",
      "Godkendt",
      "uden designændringer",
      "grænsen på 4,0",
      "grænseværdi: 4,0",
      "grænseværdi: 6,7",
    ]) {
      expect(content.toLocaleLowerCase("da-DK")).not.toContain(
        stale.toLocaleLowerCase("da-DK"),
      );
    }
    expect(content).toContain("ikke et dokumenteret slutresultat");
  });

  it("removes stale Agavevej claims from source and crawler-facing files", () => {
    const root = join(__dirname, "..", "..");
    const publicText = readTextFilesRecursively(join(root, "public"));
    const sourceText = readTextFilesRecursively(join(root, "src"));
    const liveText = `${publicText}\n${sourceText}`;

    for (const stale of [
      "3" + ",538",
      "Fra 47% over grænsen til godkendt",
      "40" + "% reduktion med produktspecifikke EPD'er",
      "uden designændringer. Produktspecifikke EPD'er gjorde forskellen",
      "alene ved at erstatte generiske data med produktspecifikke EPD'er",
    ]) {
      expect(liveText).not.toContain(stale);
    }
  });
});
