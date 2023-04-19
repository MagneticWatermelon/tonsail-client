import TestRunCard from '@/components/TestRuns/TestRunCard';
import { useCreateTest } from '@/features/test';
import { useTitleActions } from '@/stores/AppTitleStore';
import { Button, Modal, Paper, Stack, Text, TextInput, useMantineColorScheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProject } from '../api/getProject';

type ProjectRouteParams = {
  projectId: string;
};

export function ProjectTests() {
  const theme = useMantineColorScheme();
  const { projectId } = useParams() as ProjectRouteParams;
  const project = useProject(projectId);
  const createTest = useCreateTest();
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();
  const { setTitle } = useTitleActions();

  useEffect(() => {
    setTitle('Project');
  }, []);

  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must not be empty' : null)
    }
  });

  async function handleCreateTest(data: { name: string }) {
    createTest.mutate(
      { name: data.name, projectId: projectId },
      {
        onSuccess: (data) => {
          setModalOpened(false);
          project.refetch();
          navigate(`/tests/${data.id}/config`);
        },
        onError(error) {
          showNotification({
            title: 'Test creation failed',
            message: `${error}`,
            autoClose: 5000,
            color: 'red',
            icon: <IconX />
          });
        }
      }
    );
  }

  return (
    <Stack>
      <Paper>
        <Button
          variant="outline"
          color={theme.colorScheme == 'dark' ? 'limeZest' : 'nordicNoir'}
          onClick={() => {
            setModalOpened(true);
          }}>
          Create Test
        </Button>
      </Paper>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {project.data?.tests?.map((test, idx) => {
          return <TestRunCard test={test} key={idx} />;
        })}
      </div>
      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
        }}
        title={
          <Text size="xl" weight={700}>
            New Test
          </Text>
        }
        centered>
        <form onSubmit={form.onSubmit((values) => handleCreateTest(values))}>
          <Stack>
            <TextInput
              {...form.getInputProps('name')}
              label={
                <Text size="md" weight={700}>
                  Test Name
                </Text>
              }
            />
            <Button
              type="submit"
              variant="outline"
              color={theme.colorScheme == 'dark' ? 'gray.4' : 'nordicNoir'}
              size="lg"
              disabled={!form.isDirty()}>
              Save
            </Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
}
