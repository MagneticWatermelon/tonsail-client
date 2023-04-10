import { useTitleActions } from '@/stores/AppTitleStore';
import { Button, Flex, MultiSelect } from '@mantine/core';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMetricQueries } from '../api/getRunMetrics';
import MetricChart from '../components/MetricChart';
import { useForm } from '@mantine/form';
import { useListState } from '@mantine/hooks';

interface Params {
  runId: string;
}

const data = [
  {
    label: 'Method',
    value: 'method:GET'
  },
  {
    label: 'Status',
    value: 'status:200'
  },
  {
    label: 'Scenario',
    value: 'scenario:Scenario 1'
  }
];

export function TonsailTestRun() {
  const { runId } = useParams<keyof Params>() as Params;
  const [queries, queryHandlers] = useListState([{ runID: runId, name: 'http_request_rate' }]);
  const metricList = useMetricQueries(queries);

  const form = useForm({
    initialValues: {
      query: ['']
    },
    transformValues: (values) => {
      return values.query
        .map((p) => p.split(':'))
        .reduce((prev, val) => ({ ...prev, [val[0]]: val[1] }), {});
    }
  });

  const { setTitle } = useTitleActions();
  useEffect(() => {
    setTitle('Run with ID');
  }, []);

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) =>
          queryHandlers.append({ runID: runId, name: 'http_response_rate', ...values })
        )}>
        <MultiSelect
          data={data}
          label="Filter query"
          clearButtonProps={{ 'aria-label': 'Clear selection' }}
          clearable
          {...form.getInputProps('query', { type: 'input' })}
        />
        <Button type="submit">Submit</Button>
      </form>

      <Flex style={{ flex: '1 1 100%', flexDirection: 'column', height: 400, minWidth: 0 }}>
        <MetricChart metricList={metricList} />
      </Flex>
    </>
  );
}
