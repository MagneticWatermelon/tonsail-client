import { client } from '@/lib/apiClient';
import { Project } from '@/types/Project';
import { QueryClient, useQuery } from '@tanstack/react-query';

async function getProject(id: String): Promise<Project> {
  const res = await client.get(`projects/${id}`);
  return res.json();
}
const getProjectQuery = (id: string) => ({
  queryKey: ['project', id],
  queryFn: () => getProject(id)
});

export const projectLoader =
  (queryClient: QueryClient) =>
    async ({ params }: any) => {
      const query = getProjectQuery(params.projectId);
      // ⬇️ return data or fetch it
      return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
    };

function useProject(id: String) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id)
  });
}
