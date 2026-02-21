export type JobType = 'FC' | 'TMR' | 'GENERAL' | 'MANAGER';
export type JobLevel = 'PREMIUM' | 'SPECIAL' | 'GENERAL';

export interface JobListing {
  id: string;
  companyName: string;
  title: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  location: string;
  jobType: JobType;
  level: JobLevel;
  salary?: string;
  postedAt: string;
  deadline?: string;
  contact?: string;
}
