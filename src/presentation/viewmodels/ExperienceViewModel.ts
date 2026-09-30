import type { Focus, Role } from "../../domain/entities";
import type { FocusFilter, GetExperience } from "../../domain/usecases";
import { Observable } from "../core/Observable";

export interface ExperienceState {
  filter: FocusFilter;
  roles: Role[];
  openId: string | null;
}

export const FILTER_LABELS: ReadonlyArray<{ id: FocusFilter; label: string }> = [
  { id: "all", label: "Everything" },
  { id: "fintech", label: "Fintech" },
  { id: "mobile", label: "Mobile" },
  { id: "automation", label: "Automation" },
  { id: "ai", label: "AI & no-code" },
  { id: "erp", label: "ERP" },
] satisfies ReadonlyArray<{ id: Focus | "all"; label: string }>;

export class ExperienceViewModel {
  readonly state: Observable<ExperienceState>;

  constructor(private readonly getExperience: GetExperience) {
    const roles = getExperience.execute("all");
    this.state = new Observable<ExperienceState>({
      filter: "all",
      roles,
      openId: roles[0]?.id ?? null,
    });
  }

  select(filter: FocusFilter): void {
    this.state.update((s) => {
      const roles = this.getExperience.execute(filter);
      const stillVisible = roles.some((r) => r.id === s.openId);
      return { filter, roles, openId: stillVisible ? s.openId : (roles[0]?.id ?? null) };
    });
  }

  toggle(id: string): void {
    this.state.update((s) => ({ ...s, openId: s.openId === id ? null : id }));
  }
}
