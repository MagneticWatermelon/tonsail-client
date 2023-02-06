import { IconHistoryOff } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { DataTable } from 'mantine-datatable';
import { useLoaderData, useNavigate } from 'react-router-dom';

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
