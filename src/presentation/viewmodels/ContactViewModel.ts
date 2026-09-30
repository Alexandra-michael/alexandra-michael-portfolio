import type { Profile } from "../../domain/entities";
import type { GetProfile } from "../../domain/usecases";
import { Observable } from "../core/Observable";

export interface ClipboardPort {
  writeText(text: string): Promise<void>;
}

export type CopyStatus = "idle" | "copied" | "failed";

export class ContactViewModel {
  readonly profile: Profile;
  readonly copyStatus = new Observable<CopyStatus>("idle");

  constructor(
    getProfile: GetProfile,
    private readonly clipboard: ClipboardPort,
    private readonly resetAfterMs = 2200,
  ) {
    this.profile = getProfile.execute();
  }

  get mailto(): string {
    return `mailto:${this.profile.email}?subject=${encodeURIComponent("Hello Alexandra")}`;
  }

  get phoneHref(): string {
    return `tel:${this.profile.phone.replace(/\s/g, "")}`;
  }

  async copyEmail(): Promise<void> {
    try {
      await this.clipboard.writeText(this.profile.email);
      this.copyStatus.set("copied");
    } catch {
      this.copyStatus.set("failed");
    }
    setTimeout(() => this.copyStatus.set("idle"), this.resetAfterMs);
  }
}
