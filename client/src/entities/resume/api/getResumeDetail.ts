import { Resume } from '../model/types';
import { client } from '@/shared/api/client';
export async function getResumeDetail(id: string): Promise<Resume | undefined> {
  return client.get(`/resumes/${id}`);
}
