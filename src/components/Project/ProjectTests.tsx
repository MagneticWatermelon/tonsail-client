import {
  Button,
  Grid,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  useMantineColorScheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { client } from '../../lib/apiClient';
import { Project } from '../../types/Project';
import TestRunCard from '../TestRuns/TestRunCard';

export default function ProjectTests() {
  const theme = useMantineColorScheme();
  const project = useLoaderData() as Project;
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: { name: '' },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must not be empty' : null)
    }
  });

  async function handleCreateTest(data: { name: string }) {
    try {
      let test = (await client
        .post(`tests`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            name: data.name,
            project_id: project.id
          })
        })
        .json()) as any;

      setModalOpened(false);
      navigate(`/tests/${test.id}/config`);
    } catch (error) {
      showNotification({
        title: 'Test creation failed',
        message: `${error}`,
        autoClose: 5000,
        color: 'red',
        icon: <IconX />
      });
    }
  }
  return (
    <Stack>
      <Paper>
        <Button
          variant="outline"
          onClick={() => {
            setModalOpened(true);
          }}>
          Create Test
        </Button>
      </Paper>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {project.tests?.map((test, idx) => {
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
              color={theme.colorScheme == 'dark' ? 'gray.4' : 'blue'}
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
