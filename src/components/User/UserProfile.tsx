import {
  Paper,
  Text,
  Stack,
  Divider,
  Title,
  TextInput,
  CopyButton,
  Tooltip,
  ActionIcon,
  Button,
  Center,
  useMantineColorScheme,
  Group,
  Modal,
  PasswordInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconCopy } from '@tabler/icons';
import Avvvatars from 'avvvatars-react';
import { useEffect, useState } from 'react';
import { client } from '../../lib/apiClient';
import { useAuth } from '../../util/AuthProvider';
import { PasswordStrength } from './PasswordInputWithStrength';

export default function UserProfile() {
  const theme = useMantineColorScheme();
  const { user, updateUser } = useAuth();
  const [changed, setChanged] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const passwordForm = useForm({
    initialValues: { old_password: '', old_password_again: '', new_password: '' },
    transformValues: (values) => ({
      password: values.new_password
    })
  });

  const form = useForm({
    initialValues: { organization_id: user.organizationId, name: user.name, email: user.email },
    transformValues: (values) => ({
      name: values.name,
      email: values.email
    })
  });

  async function handleSubmit(data: { name: string; email: string }) {
    let updatedUser = await client
      .put(`users/${user.id}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          name: data.name,
          email: data.email
        })
      })
      .json();

    updateUser(updatedUser);
  }

  async function handlePasswordSubmit(data: { password: string }) {
    let updatedUser = await client
      .put(`users/${user.id}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          password: data.password
        })
      })
      .json();

    updateUser(updatedUser);
  }

  useEffect(() => {
    if (form.isDirty()) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [form.values]);

  return (
    <Center>
      <Paper shadow="md" p="md" radius="md" w={600} withBorder>
        <Title order={3} weight={700}>
          Profile
        </Title>
        <Divider />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack spacing="lg" pt="md">
            <Stack>
              <Text size="md" weight={700}>
                Profile Picture
              </Text>
              <Avvvatars value={user.name} size={175} />
            </Stack>
            <TextInput
              {...form.getInputProps('organization_id')}
              label={
                <Text size="md" weight={700}>
                  Organization ID
                </Text>
              }
              disabled
              rightSection={
                <CopyButton value={user.organizationId} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'green' : 'gray'} onClick={copy}>
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              }
            />
            <TextInput
              {...form.getInputProps('name')}
              label={
                <Text size="md" weight={700}>
                  Full Name
                </Text>
              }
              placeholder="Full name"
            />
            <TextInput
              {...form.getInputProps('email')}
              label={
                <Text size="md" weight={700}>
                  Email
                </Text>
              }
              placeholder="hello@email.com"
            />
            <Center>
              <Group>
                <Button
                  type="submit"
                  variant="outline"
                  color={theme.colorScheme == 'dark' ? 'gray.4' : 'blue'}
                  size="lg"
                  disabled={changed}
                >
                  Save Profile
                </Button>
                <Button
                  variant="outline"
                  color={theme.colorScheme == 'dark' ? 'gray.4' : 'red'}
                  onClick={() => setModalOpened(true)}
                  size="lg"
                >
                  Update Password
                </Button>
              </Group>
            </Center>
          </Stack>
        </form>
      </Paper>
      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
        }}
        title="Introduce yourself!"
        centered
      >
        <form onSubmit={passwordForm.onSubmit((values) => handlePasswordSubmit(values))}>
          <Stack>
            <PasswordInput
              label="Old Password"
              placeholder="Current password"
              mt="md"
              size="md"
              {...passwordForm.getInputProps('old_password')}
            />
            <PasswordInput
              label="Old Password Again"
              placeholder="Current password again"
              mt="md"
              size="md"
              {...passwordForm.getInputProps('old_password_again')}
            />
            <PasswordStrength form={passwordForm.getInputProps('new_password')} />
            <Button
              type="submit"
              variant="outline"
              color={theme.colorScheme == 'dark' ? 'gray.4' : 'blue'}
              size="lg"
            >
              Save Password
            </Button>
          </Stack>
        </form>
      </Modal>
    </Center>
  );
}
