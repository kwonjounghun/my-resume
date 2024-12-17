import { Resume } from '../model/types';

export async function getResumeDetail(id: number): Promise<Resume | undefined> {
  try {
    const response = await fetch(`/api/resumes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch resume detail');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching resume detail:', error);
    return undefined;
  }
} 