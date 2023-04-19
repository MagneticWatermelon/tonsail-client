import { useTitleActions } from '@/stores/AppTitleStore';
import {
  ActionIcon,
  Button,
  ColorPicker,
  ColorSwatch,
  Flex,
  Group,
  MultiSelect,
  Popover,
  Select,
  Text,
  useMantineTheme
} from '@mantine/core';
import { forwardRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMetricQueries } from '../api/getRunMetrics';
import MetricChart from '../components/MetricChart';
import { useForm } from '@mantine/form';
import { randomId, useListState } from '@mantine/hooks';
import { IconTrashX } from '@tabler/icons-react';
import { MetricQueryParams } from '../types';
import { useMetricCatalog } from '../api/getMetricCatalog';

interface Params {
  runId: string;
}

const data = [
  {
    label: 'GET',
    value: 'method:GET',
    group: 'Method'
  },
  {
    label: 'PUT',
    value: 'method:PUT',
    group: 'Method'
  },
  {
    label: 'POST',
    value: 'method:POST',
    group: 'Method'
  },
  {
    label: 'DELETE',
    value: 'method:DELETE',
    group: 'Method'
  },
  {
    label: '200',
    value: 'status:200',
    group: 'Status'
  },
  {
    label: '400',
    value: 'status:400',
    group: 'Status'
  },
  {
    label: 'Scenario 2',
    value: 'scenario:Scenario 2',
    group: 'Scenario'
  },
  {
    label: 'Scenario 1',
    value: 'scenario:Scenario 1',
    group: 'Scenario'
  }
];

function extractColors(
  queries: {
    color: string;
    name: string;
    query: string[];
    key: string;
  }[]
): string[] {
  return queries.map((q) => q.color);
}

// Taken from https://stackoverflow.com/a/5365036
function randomColor() {
  return '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0');
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export function TonsailTestRun() {
  const theme = useMantineTheme();
  const { runId } = useParams<keyof Params>() as Params;
  const [queries, queryHandlers] = useListState<MetricQueryParams>([]);
  const metricList = useMetricQueries(queries);
  const metricCatalog = useMetricCatalog();

  const queriesForm = useForm({
    initialValues: {
      queries: [{ color: randomColor(), name: '', query: [''], key: randomId() }]
    },
    transformValues: (values) => {
      let omitted = values.queries.map((a) => {
        let { color: _c, key: _k, ...rest } = a;
        return rest;
      });
      return omitted.map((p) => {
        return {
          runID: runId,
          name: p.name,
          ...p.query
            .map((q) => {
              return q.split(':');
            })
            .reduce((prev, val) => ({ ...prev, [val[0]]: val[1] }), {})
        };
      });
    }
  });

  const { setTitle } = useTitleActions();
  useEffect(() => {
    setTitle('Run with ID');
  }, []);

  return (
    <>
      <Flex style={{ flex: '1 1 100%', flexDirection: 'column', height: 400, minWidth: 0 }}>
        <MetricChart colors={extractColors(queriesForm.values.queries)} metricList={metricList} />
      </Flex>

      <form
        onSubmit={queriesForm.onSubmit((values) => {
          queryHandlers.setState(values);
        })}>
        {queriesForm.values.queries.map((q, index) => {
          return (
            <Group key={q.key} mb="sm" maw="50rem">
              <Popover position="bottom">
                <Popover.Target>
                  <ColorSwatch color={q.color} />
                </Popover.Target>

                <Popover.Dropdown>
                  <ColorPicker {...queriesForm.getInputProps(`queries.${index}.color`)} />
                </Popover.Dropdown>
              </Popover>

              {metricCatalog.data && (
                <Select
                  style={{ flex: 'auto' }}
                  searchable
                  nothingFound="No options"
                  itemComponent={SelectItem}
                  data={metricCatalog.data}
                  {...queriesForm.getInputProps(`queries.${index}.name`)}
                />
              )}

              <MultiSelect
                style={{ flex: 'auto' }}
                data={data}
                clearButtonProps={{ 'aria-label': 'Clear selection' }}
                clearable
                searchable
                filter={(_value, selected, item) => {
                  return (
                    !selected &&
                    !q.query.some((selected) => {
                      let it = data.find((val) => val.value == selected);
                      return it?.group == item.group;
                    })
                  );
                }}
                {...queriesForm.getInputProps(`queries.${index}.query`, { type: 'input' })}
              />

              <ActionIcon
                color="dynamite"
                onClick={() => queriesForm.removeListItem('queries', index)}>
                <IconTrashX size="1rem" />
              </ActionIcon>
            </Group>
          );
        })}

        <Group>
          <Button
            color={theme.colorScheme == 'dark' ? 'limeZest' : 'nordicNoir'}
            variant="outline"
            onClick={() =>
              queriesForm.insertListItem('queries', {
                color: randomColor(),
                name: '',
                query: [''],
                key: randomId()
              })
            }>
            Add
          </Button>
          <Button
            color={theme.colorScheme == 'dark' ? 'limeZest' : 'nordicNoir'}
            variant="outline"
            type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
}
