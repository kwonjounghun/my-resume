export class Project {
  id?: string;
  userId: string;
  title: string;
  workExperienceId: string;
  companyName: string;
  startDate: string;
  endDate: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  summary?: string;
  keywords?: string[];
  isPublic: boolean;

  constructor(partial: Partial<Project>) {
    Object.assign(this, partial);
  }
} 