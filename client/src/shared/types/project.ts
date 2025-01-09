export interface Project {
  id: string;
  title: string; // max 50 characters
  companyName: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM
  keywords: string[];
  situation: string;
  task: string;
  action: string;
  result: string;
  isPublic: boolean;
  workExperienceId: string;
}

export const validateProjectTitle = (title: string): boolean => {
  return title.length <= 50;
}; 