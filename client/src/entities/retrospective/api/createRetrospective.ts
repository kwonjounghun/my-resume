import { CreateRetrospectiveRequest, CreateRetrospectiveResponse } from '../model/types';

export async function createRetrospective(
  data: CreateRetrospectiveRequest
): Promise<CreateRetrospectiveResponse> {
  const response = await fetch('/api/retrospectives', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create retrospective');
  }

  return response.json();
} 