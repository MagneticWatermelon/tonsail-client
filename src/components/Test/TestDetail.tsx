import { IconHistoryOff } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { DataTable } from 'mantine-datatable';
import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useTitleActions } from '../../stores/AppTitleStore';

interface Test {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  projectId: string;
  runs: TestRun[];
}
interface TestRun {
  id: string;
  createdAt: string;
  status: string;
  testId: string;
}

export default function TestDetail() {
  const test = useLoaderData() as Test;
  const navigate = useNavigate();
  const { setTitle } = useTitleActions();
  useEffect(() => {
    setTitle('Test Runs');
  }, []);
  return (
    <DataTable
      shadow="md"
      highlightOnHover
      textSelectionDisabled
      noRecordsText="No Test History"
      noRecordsIcon={<IconHistoryOff size={80} />}
      columns={[
        { accessor: 'status' },
        {
          accessor: 'config',
          title: 'VUs / Duration'
        },
        {
          accessor: 'createdAt',
          title: 'Started',
          render: ({ createdAt }) =>
            DateTime.fromISO(createdAt).toLocaleString(DateTime.DATETIME_MED)
        }
      ]}
      records={test.runs}
      onRowClick={(run, _rowIndex) => {
        navigate(`/runs/${run.id}`);
      }}
    />
  );
}
