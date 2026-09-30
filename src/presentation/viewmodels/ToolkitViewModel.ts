import type { SkillGroup } from "../../domain/entities";
import type { GetSkills } from "../../domain/usecases";

export class ToolkitViewModel {
  readonly groups: SkillGroup[];

  constructor(getSkills: GetSkills) {
    this.groups = getSkills.execute();
  }
}
