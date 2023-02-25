import { client } from '@/lib/apiClient';
import { QueryClient } from '@tanstack/react-query';

interface RunMetric {
  name: string;
  runID: string;
  values: Values[];
}

interface Values {
  ts: string;
  value: number;
}

async function getRunMetrics(id: string): Promise<RunMetric[]> {
  return client
    .get('metrics', {
      searchParams: new URLSearchParams({
        runID: id,
        name: 'http_request_rate',
        method: 'GET',
        status: '200'
      })
    })
    .json();
}
const getRunMetricsQuery = (id: string) => ({
  queryKey: ['runMetric', id],
  queryFn: () => getRunMetrics(id)
});

export const runMetricsLoader =
  (queryClient: QueryClient) =>
    async ({ params }: any) => {
      const query = getRunMetricsQuery(params.runId);
      return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
    };
