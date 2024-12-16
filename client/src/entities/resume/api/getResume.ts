import { Resume } from '../model/types';

export const getResume = async (id: number): Promise<Resume> => {
  const response = await fetch(`/api/resumes/${id}`);
  if (!response.ok) {
    throw new Error('이력서를 불러오는데 실패했습니다.');
  }
  return response.json();
}; 