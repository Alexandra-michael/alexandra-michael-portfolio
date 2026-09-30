import type { Credential, Focus, Metric, Profile, Role, SkillGroup } from "../entities";
import type { ExperienceRepository, ProfileRepository, SkillsRepository } from "../repositories";

export type FocusFilter = Focus | "all";

export class GetProfile {
  constructor(private readonly repo: ProfileRepository) {}
  execute(): Profile {
    return this.repo.getProfile();
  }
}

export class GetMetrics {
  constructor(private readonly repo: ProfileRepository) {}
  execute(): Metric[] {
    return this.repo.getMetrics();
  }
}

export class GetCredentials {
  constructor(private readonly repo: ProfileRepository) {}
  execute(): Credential[] {
    return this.repo.getCredentials();
  }
}

export class GetExperience {
  constructor(private readonly repo: ExperienceRepository) {}
  execute(filter: FocusFilter = "all"): Role[] {
    const roles = this.repo.getRoles();
    return filter === "all" ? roles : roles.filter((r) => r.focus.includes(filter));
  }
}

export class GetSkills {
  constructor(private readonly repo: SkillsRepository) {}
  execute(): SkillGroup[] {
    return this.repo.getSkillGroups();
  }
}
