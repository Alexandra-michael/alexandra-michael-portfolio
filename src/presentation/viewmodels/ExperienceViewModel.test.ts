import { describe, expect, it } from "vitest";
import { StaticExperienceRepository } from "../../data/repositories";
import { GetExperience } from "../../domain/usecases";
import { ExperienceViewModel } from "./ExperienceViewModel";

const make = () => new ExperienceViewModel(new GetExperience(new StaticExperienceRepository()));

describe("ExperienceViewModel", () => {
  it("starts on everything with the newest role open", () => {
    const s = make().state.get();
    expect(s.filter).toBe("all");
    expect(s.roles.length).toBeGreaterThan(5);
    expect(s.openId).toBe(s.roles[0]?.id);
  });

  it("filters by focus and only returns matching roles", () => {
    const vm = make();
    vm.select("fintech");
    const { roles } = vm.state.get();
    expect(roles.length).toBeGreaterThan(0);
    expect(roles.every((r) => r.focus.includes("fintech"))).toBe(true);
  });

  it("moves the open case file when the current one is filtered out", () => {
    const vm = make();
    vm.select("erp");
    const s = vm.state.get();
    expect(s.roles.some((r) => r.id === s.openId)).toBe(true);
  });

  it("toggles a case file closed and open", () => {
    const vm = make();
    const id = vm.state.get().openId!;
    vm.toggle(id);
    expect(vm.state.get().openId).toBeNull();
    vm.toggle(id);
    expect(vm.state.get().openId).toBe(id);
  });
});
