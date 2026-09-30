import type { Credential, Metric, Profile, Role, SkillGroup } from "../domain/entities";
import type { ExperienceRepository, ProfileRepository, SkillsRepository } from "../domain/repositories";
import { credentials, metrics, profile, roles, skillGroups } from "./content";

export class StaticProfileRepository implements ProfileRepository {
  getProfile(): Profile {
    return profile;
  }
  getMetrics(): Metric[] {
    return metrics;
  }
  getCredentials(): Credential[] {
    return credentials;
  }
}

export class StaticExperienceRepository implements ExperienceRepository {
  getRoles(): Role[] {
    return roles;
  }
}

export class StaticSkillsRepository implements SkillsRepository {
  getSkillGroups(): SkillGroup[] {
    return skillGroups;
  }
}
