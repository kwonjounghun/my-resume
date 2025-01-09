export interface WorkExperience {
  id: string;
  company: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkExperience {
  company: string;
  startDate: string;
  endDate: string;
}