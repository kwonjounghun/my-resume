import { useQuery } from '@tanstack/react-query';

async function fetchExample() {
  const response = await fetch('/api/example');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useExample() {
  return useQuery({
    queryKey: ['example'],
    queryFn: fetchExample,
  });
} 