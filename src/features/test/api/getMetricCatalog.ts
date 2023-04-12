import { client } from '@/lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import { MetricType } from '../types';

type SelectMetricType = {
  label: string;
  value: string;
} & MetricType;

async function getMetricCatalog(): Promise<SelectMetricType[]> {
  let catalog = await client.get('metrics/catalog').json<MetricType[]>();
  return catalog.map((type) => {
    return {
      label: type.name,
      value: type.name,
      ...type
    };
  });
}

export function useMetricCatalog() {
  return useQuery({
    queryKey: ['metricCatalog'],
    queryFn: () => getMetricCatalog()
  });
}
