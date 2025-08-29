export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  createdAt: string;
  board?: string;
};
