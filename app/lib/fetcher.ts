// lib/fetcher.ts
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const timeout = Number(process.env.CRAWL_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const headers = {
    "User-Agent":
      process.env.CRAWL_USER_AGENT ||
      "JobpilotMonstre/1.0 (+https://www.wearejobpilot.com)",
    ...options.headers,
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

