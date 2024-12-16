import { CreateResumeRequest, CreateResumeResponse } from '../model/types';

export async function createResume(
  resume: CreateResumeRequest
): Promise<CreateResumeResponse> {
  try {
    const response = await fetch('/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resume),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '이력서 등록에 실패했습니다.');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('알 수 없는 에러가 발생했습니다.');
  }
} 