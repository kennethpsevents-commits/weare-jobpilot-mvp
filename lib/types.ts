export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  source: "greenhouse";
  updatedAt?: string;
};

export type IngestResult = {
  count: number;
  boards: string[];
};
