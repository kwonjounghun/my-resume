export interface Project {
  id: string;
  title: string; // max 50 characters
  companyName: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM
  keywords: string[];
  isPublic: boolean;
}

export const validateProjectTitle = (title: string): boolean => {
  return title.length <= 50;
}; 