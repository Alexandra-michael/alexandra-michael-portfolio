import type { GetProfile } from "../../domain/usecases";
import type { Profile } from "../../domain/entities";

export class HeroViewModel {
  readonly profile: Profile;

  constructor(getProfile: GetProfile) {
    this.profile = getProfile.execute();
  }

  get firstName(): string {
    return this.profile.name.split(" ")[0] ?? this.profile.name;
  }

  get mailto(): string {
    return `mailto:${this.profile.email}`;
  }
}
