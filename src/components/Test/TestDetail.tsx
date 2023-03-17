import { useTestRuns } from '@/features/test';
import { IconHistoryOff } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { DataTable } from 'mantine-datatable';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTitleActions } from '../../stores/AppTitleStore';

type TestDetailRouteParams = {
  testId: string;
};

export default function TestDetail() {
  const { testId } = useParams() as TestDetailRouteParams;
  const test = useTestRuns(testId);
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
      records={test.data?.runs}
      onRowClick={(run, _rowIndex) => {
        navigate(`/runs/${run.id}`);
      }}
    />
  );
}
