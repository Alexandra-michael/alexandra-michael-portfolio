import type { Credential, Profile } from "../../domain/entities";
import type { GetCredentials, GetProfile } from "../../domain/usecases";

export class AboutViewModel {
  readonly profile: Profile;
  readonly credentials: Credential[];

  constructor(getProfile: GetProfile, getCredentials: GetCredentials) {
    this.profile = getProfile.execute();
    this.credentials = getCredentials.execute();
  }
}
