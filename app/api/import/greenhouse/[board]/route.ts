import { NextResponse } from 'next/server';
interface Job {
  id: number;
  title: string;
  location: string;
  department: string;
  salary: string;
  url: string;
  remote: boolean;
  employment_type: string;
}
export async function GET(
  request: Request,
  { params }: { params: { board: string } }
) {
  try {
    const { board } = params;
    const apiKey = process.env.GREENHOUSE_API_KEY;
   
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing API key' },
        { status: 500 }
      );
    }
    const response = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${board}/jobs?content=true`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
   
    const jobs: Job[] = data.jobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      location: job.location?.name || 'Remote',
      department: job.departments[0]?.name || 'Other',
      salary: job.salary || 'Competitive',
      url: job.absolute_url,
      remote: job.location?.name?.toLowerCase().includes('remote') || false,
      employment_type: job.employment_type || 'Full-time'
    }));
    return NextResponse.json({
      jobs,
      meta: {
        board: data.board.name,
        company: data.board.company_name,
        total_jobs: jobs.length
      }
    });
  } catch (error) {
    console.error('Greenhouse API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
