// lib/connectors.ts
// Alle connectors geven nu minstens 1 dummy job terug.
// Zo werkt de hele lijst. Later kun je dit vervangen door echte API calls.

import greenhouseBoards from "@/data/greenhouse.json";

export type MinimalJob = {
  id: string;
  title: string;
  company?: string;
  url?: string;
  location?: string;
  source: "greenhouse" | "lever" | "ashby" | "workable" | "teamtailor";
  board?: string;
  description?: string;
};

// ---- Greenhouse (seed jobs uit data/greenhouse.json) ----
export async function getGreenhouse(board: string): Promise<MinimalJob[]> {
  const meta =
    Array.isArray(greenhouseBoards) &&
    (greenhouseBoards as any[]).find((b) => b.board === board);

  const company = (meta && (meta as any).name) || board;

  return [
    {
      id: `${board}-seed-1`,
      title: `${company} — Greenhouse Listing`,
      company,
      url: `https://boards.greenhouse.io/${board}`,
      location: "Remote",
      source: "greenhouse",
      board,
      description: (meta && (meta as any).description) || "Greenhouse seed job"
    }
  ];
}

// ---- Lever ----
export async function getLever(board: string): Promise<MinimalJob[]> {
  return [
    {
      id: `${board}-lever-1`,
      title: `${board} — Lever Listing`,
      company: board,
      url: `https://${board}.lever.co`,
      location: "Hybrid",
      source: "lever",
      board,
      description: "Dummy Lever job"
    }
  ];
}

// ---- Ashby ----
export async function getAshby(board: string): Promise<MinimalJob[]> {
  return [
    {
      id: `${board}-ashby-1`,
      title: `${board} — Ashby Listing`,
      company: board,
      url: `https://${board}.ashbyhq.com`,
      location: "On-site",
      source: "ashby",
      board,
      description: "Dummy Ashby job"
    }
  ];
}

// ---- Workable ----
export async function getWorkable(subdomain: string): Promise<MinimalJob[]> {
  return [
    {
      id: `${subdomain}-workable-1`,
      title: `${subdomain} — Workable Listing`,
      company: subdomain,
      url: `https://${subdomain}.workable.com`,
      location: "Remote",
      source: "workable",
      board: subdomain,
      description: "Dummy Workable job"
    }
  ];
}

// ---- Teamtailor ----
export async function getTeamtailor(subdomain: string): Promise<MinimalJob[]> {
  return [
    {
      id: `${subdomain}-teamtailor-1`,
      title: `${subdomain} — Teamtailor Listing`,
      company: subdomain,
      url: `https://${subdomain}.teamtailor.com`,
      location: "Remote",
      source: "teamtailor",
      board: subdomain,
      description: "Dummy Teamtailor job"
    }
  ];
}
