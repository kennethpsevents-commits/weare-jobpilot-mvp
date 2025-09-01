import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
interface ScrapedJob {
  title: string;
  company: string;
  location: string;
  salary: string;
  url: string;
  source: string;
}
export async function GET() {
  const browser = await puppeteer.launch({ headless: true });
 
  try {
    const page = await browser.newPage();
   
    // Target European job listings
    await page.goto('https://www.google.com/search?q=jobs+in+Europe&ibp=htl;jobs', {
      waitUntil: 'networkidle2'
    });
    // Wait for job results to load
    await page.waitForSelector('.jobsearch-SerpJobCard');
    const jobs: ScrapedJob[] = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.jobsearch-SerpJobCard')).map(job => ({
        title: job.querySelector('.title')?.textContent?.trim() || '',
        company: job.querySelector('.company')?.textContent?.trim() || '',
        location: job.querySelector('.location')?.textContent?.trim() || '',
        salary: job.querySelector('.salaryText')?.textContent?.trim() || 'Not specified',
        url: (job.querySelector('a') as HTMLAnchorElement)?.href || '',
        source: 'Google Jobs'
      }));
    });
    return NextResponse.json({
      jobs,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crawling Error:', error);
    return NextResponse.json(
      { error: 'Crawling failed' },
      { status: 500 }
    );
  } finally {
    await browser.close();
  }
}
