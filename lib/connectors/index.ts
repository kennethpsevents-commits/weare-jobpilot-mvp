import type { Job } from "../types";
import { fetchGreenhouseBoards } from "./greenhouse";

export async function listGreenhouseMapped(tokens: string[]): Promise<Job[]> {
  return fetchGreenhouseBoards(tokens);
}
