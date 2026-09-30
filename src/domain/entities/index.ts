export type Focus = "fintech" | "mobile" | "automation" | "ai" | "erp";

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  bio: string[];
}

export interface Metric {
  value: number;
  suffix: string;
  label: string;
}

export interface Role {
  id: string;
  company: string;
  umbrella?: string;
  title: string;
  period: string;
  location?: string;
  current: boolean;
  focus: Focus[];
  summary: string;
  highlights: string[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Credential {
  title: string;
  issuer: string;
  note: string;
}
