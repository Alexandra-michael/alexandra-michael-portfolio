import "./styles/main.css";
import { StaticExperienceRepository, StaticProfileRepository, StaticSkillsRepository } from "./data/repositories";
import { GetCredentials, GetExperience, GetMetrics, GetProfile, GetSkills } from "./domain/usecases";
import type { View } from "./presentation/core/View";
import { AboutViewModel } from "./presentation/viewmodels/AboutViewModel";
import { ContactViewModel } from "./presentation/viewmodels/ContactViewModel";
import { ExperienceViewModel } from "./presentation/viewmodels/ExperienceViewModel";
import { HeroViewModel } from "./presentation/viewmodels/HeroViewModel";
import { StatsViewModel } from "./presentation/viewmodels/StatsViewModel";
import { ToolkitViewModel } from "./presentation/viewmodels/ToolkitViewModel";
import { AboutView } from "./presentation/views/AboutView";
import { ContactView } from "./presentation/views/ContactView";
import { ExperienceView } from "./presentation/views/ExperienceView";
import { HeaderView } from "./presentation/views/HeaderView";
import { HeroView } from "./presentation/views/HeroView";
import { StatsView } from "./presentation/views/StatsView";
import { ToolkitView } from "./presentation/views/ToolkitView";

// Composition root: the only place that knows which concrete classes are used.
const profileRepo = new StaticProfileRepository();
const experienceRepo = new StaticExperienceRepository();
const skillsRepo = new StaticSkillsRepository();

const getProfile = new GetProfile(profileRepo);
const getMetrics = new GetMetrics(profileRepo);
const getCredentials = new GetCredentials(profileRepo);
const getExperience = new GetExperience(experienceRepo);
const getSkills = new GetSkills(skillsRepo);

const views: View[] = [
  new HeaderView(),
  new HeroView(new HeroViewModel(getProfile)),
  new StatsView(new StatsViewModel(getMetrics)),
  new ExperienceView(new ExperienceViewModel(getExperience)),
  new AboutView(new AboutViewModel(getProfile, getCredentials)),
  new ToolkitView(new ToolkitViewModel(getSkills)),
  new ContactView(new ContactViewModel(getProfile, navigator.clipboard)),
];

const root = document.getElementById("app");
if (!root) throw new Error("#app not found");
// Drop the prerendered SEO copy (see vite.config.ts) before the app renders.
root.replaceChildren();
views.forEach((v) => v.mount(root));
