import { Resume } from '../model/types';

export const updateResume = async (id: number, data: Partial<Resume>): Promise<Resume> => {
  const response = await fetch(`/api/resumes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('이력서를 수정하는데 실패했습니다.');
  }

  return response.json();
}; 