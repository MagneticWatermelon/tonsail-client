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
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconCopy, IconX } from '@tabler/icons-react';
import Avvvatars from 'avvvatars-react';
import { useState } from 'react';
import { client } from '../../lib/apiClient';
import { useAuth } from '../../util/AuthProvider';
import { PasswordStrength } from './PasswordInputWithStrength';

export default function UserProfile() {
  const theme = useMantineColorScheme();
  const { user, updateUser } = useAuth();
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
    try {
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

      showNotification({
        title: 'Success',
        message: `User info updated`,
        autoClose: 5000,
        color: 'green',
        icon: <IconCheck />
      });

      form.resetDirty();
    } catch (error) {
      showNotification({
        title: 'Update failed',
        message: `${error}`,
        autoClose: 5000,
        color: 'red',
        icon: <IconX />
      });
    }
  }

  async function handlePasswordSubmit(data: { password: string }) {
    try {
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

      showNotification({
        title: 'Success',
        message: `Password updated`,
        autoClose: 5000,
        color: 'green',
        icon: <IconCheck />
      });
    } catch (error) {
      showNotification({
        title: 'Update failed',
        message: `${error}`,
        autoClose: 5000,
        color: 'red',
        icon: <IconX />
      });
    }
  }

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
                  disabled={!form.isDirty()}
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
        title={
          <Text size="xl" weight={700}>
            Change Password
          </Text>
        }
        centered
      >
        <form onSubmit={passwordForm.onSubmit((values) => handlePasswordSubmit(values))}>
          <Stack>
            <PasswordInput
              label="Old Password"
              mt="md"
              size="md"
              {...passwordForm.getInputProps('old_password')}
            />
            <PasswordInput
              label="Old Password Again"
              mt="md"
              size="md"
              {...passwordForm.getInputProps('old_password_again')}
            />
            <PasswordStrength form={passwordForm.getInputProps('new_password')} />
            <Button
              type="submit"
              variant="outline"
              disabled={!passwordForm.isDirty()}
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
