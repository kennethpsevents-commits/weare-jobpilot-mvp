// lib/connectors.ts
// Minimal build-safe stubs. Replace with real fetchers later.

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

// ---- Greenhouse (seed: 1 item per board) ----
export async function getGreenhouse(board: string): Promise<MinimalJob[]> {
  const meta =
    Array.isArray(greenhouseBoards) &&
    (greenhouseBoards as any[]).find((b) => b.board === board);

  const company = (meta && (meta as any).name) || board;

  return [
    {
      id: `${board}-seed-1`,
      title: `${company} — Seed Listing`,
      company,
      url: `https://boards.greenhouse.io/${board}`,
      location: "Remote",
      source: "greenhouse",
      board,
      description: (meta && (meta as any).description) || ""
    }
  ];
}

// ---- Other ATS stubs (empty for now) ----
export async function getLever(_board: string): Promise<MinimalJob[]> { return []; }
export async function getAshby(_board: string): Promise<MinimalJob[]> { return []; }
export async function getWorkable(_subdomain: string): Promise<MinimalJob[]> { return []; }
export async function getTeamtailor(_subdomain: string): Promise<MinimalJob[]> { return []; }
