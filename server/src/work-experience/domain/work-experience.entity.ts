export class WorkExperience {
  id: string;
  company: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  createdAt: Date;
  updatedAt: Date;
  userId: string;

  constructor(params: Partial<WorkExperience>) {
    Object.assign(this, params);
  }
}