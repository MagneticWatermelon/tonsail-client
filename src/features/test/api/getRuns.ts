import { client } from '@/lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Test } from '../types';

async function getTests(id: string): Promise<Test> {
  return client.get(`tests/${id}`).json();
}

export function useTestRuns(id: string) {
  return useQuery({
    queryKey: ['test', id],
    queryFn: () => getTests(id)
  });
}
