export async function deleteRetrospective(id: number): Promise<void> {
  const response = await fetch(`/api/retrospectives/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete retrospective');
  }
} 