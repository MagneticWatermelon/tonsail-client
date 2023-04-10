import { client } from '@/lib/apiClient';
import { useQueries, useQuery } from '@tanstack/react-query';
import { MetricQueryParams, RunMetric } from '../types';

async function getRunMetrics(params: MetricQueryParams): Promise<RunMetric> {
  return client
    .get('metrics', {
      searchParams: new URLSearchParams(params)
    })
    .json();
}
export function useMetricsQuery(params: MetricQueryParams) {
  return useQuery({
    queryKey: ['runMetric', params.runID, params.name],
    queryFn: () => getRunMetrics(params)
  });
}

export function useMetricQueries(paramList: MetricQueryParams[]) {
  return useQueries({
    queries: paramList.map((params) => {
      return {
        queryKey: ['runMetric', params.runID, params.name],
        queryFn: () => getRunMetrics(params)
      };
    })
  });
}
