import { describe, expect, it } from "vitest";
import { getBlogPost } from "./blogPosts";
import { GULV } from "../lib/pris";

// The price article must describe the same price model as the calculator
// (src/lib/pris.ts, vault pris-formel.md): building type × heated area, floor 4.000 kr.
describe("price article matches the price formula", () => {
  const post = getBlogPost("lca-beregning-pris")!;
  const text = [
    post.description,
    ...post.content.flatMap((s) => [s.text ?? "", ...(s.items ?? [])]),
    ...post.faqs.flatMap((f) => [f.question, f.answer]),
  ].join("\n");
  const floor = GULV.toLocaleString("da-DK");

  it("states the floor price in the opening paragraph and the description", () => {
    expect(post.content[0].text).toContain(`fra ${floor} kr`);
    expect(post.description).toContain(`${floor} kr`);
  });

  it("does not claim that area does not set the price", () => {
    expect(text).not.toMatch(/ikke pr\. kvadratmeter/);
    expect(text).not.toMatch(/arealet (i sig selv )?ikke/);
    expect(text).not.toMatch(/ikke af arealet/);
  });

  it("says the price follows building type and heated area", () => {
    expect(text).toMatch(/bygningstype og opvarmet areal/);
  });
});
