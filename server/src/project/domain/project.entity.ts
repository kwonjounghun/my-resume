export class Project {
  id: string;
  title: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  keywords?: string[];
  summary?: string;
  workExperienceId: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM

  constructor(params: Partial<Project>) {
    Object.assign(this, params);
  }
} 