import { client } from '@/lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Project } from '../types';

async function getProject(id: String): Promise<Project> {
  return client.get(`projects/${id}`).json();
}

export function useProject(id: String) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id)
  });
}
