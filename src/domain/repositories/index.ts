import type { Credential, Metric, Profile, Role, SkillGroup } from "../entities";

export interface ProfileRepository {
  getProfile(): Profile;
  getMetrics(): Metric[];
  getCredentials(): Credential[];
}

export interface ExperienceRepository {
  getRoles(): Role[];
}

export interface SkillsRepository {
  getSkillGroups(): SkillGroup[];
}
