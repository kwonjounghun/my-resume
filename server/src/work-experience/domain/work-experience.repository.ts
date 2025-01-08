import { WorkExperience } from './work-experience.entity';

export const WORK_EXPERIENCE_REPOSITORY = 'WORK_EXPERIENCE_REPOSITORY';

export interface WorkExperienceRepository {
  create(workExperience: Partial<WorkExperience>): Promise<WorkExperience>;
  findAll(userId: string): Promise<{ workExperiences: WorkExperience[]; total: number }>;
  findOne(id: string, userId: string): Promise<WorkExperience>;
  update(id: string, workExperience: Partial<WorkExperience>, userId: string): Promise<WorkExperience>;
  remove(id: string, userId: string): Promise<WorkExperience>;
} 