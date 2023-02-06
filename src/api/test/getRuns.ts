import { QueryClient } from '@tanstack/react-query';
import { client } from '../../lib/apiClient';

interface Test {
  id: string;
  status: string;
}

async function getTest(id: string): Promise<Test> {
  return client.get(`tests/${id}`).json();
}
const getTestQuery = (id: string) => ({
  queryKey: ['test', id],
  queryFn: () => getTest(id)
});

export const runTestLoader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = getTestQuery(params.testId);
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };
