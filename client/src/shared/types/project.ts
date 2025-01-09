export interface Project {
  id: string;
  title: string;
  workExperienceId: string;
  companyName: string;
  startDate: string;
  endDate: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  isPublic: boolean;
  keywords?: string[];
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const validateProjectTitle = (title: string): boolean => {
  return title.length <= 50;
}; 