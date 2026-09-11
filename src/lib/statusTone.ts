import type { ReferenceProject } from "../data/referenceProjects";

export type StatusTone = NonNullable<ReferenceProject["statusTone"]>;

/** Maps a reference project's status tone to a Tag tone. */
export const statusTagTone: Record<StatusTone, "soft" | "outline" | "ochre"> = {
  success: "soft",
  info: "outline",
  warning: "ochre",
};

export function statusToneOf(project: Pick<ReferenceProject, "statusTone">): StatusTone {
  return project.statusTone ?? "success";
}
