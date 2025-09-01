import React from 'react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary?: string;
}

export default function JobCard({ title, company, location, salary }: JobCardProps) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="font-bold">{title}</h2>
      <p>{company} - {location}</p>
      {salary && <p>Salary: {salary}</p>}
    </div>
  );
}
