export type Job = {
  extId: string;
  source: string;
  title: string;
  company: string;
  location?: string | null;
  remote: boolean;
  applyUrl: string;
  description?: string | null;
  createdAt?: string | null;
  tags?: string[];
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  countryCode?: string;
  city?: string;
};
