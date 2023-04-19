import { NeumorphicCard } from '@/components/NeumorphicCard';
import { PasswordStrength } from '@/features/auth';
import { client } from '@/lib/apiClient';
import { useUser } from '@/providers/AuthProvider';
import { useTitleActions } from '@/stores/AppTitleStore';
import {
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
  PasswordInput,
  Loader
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconCopy, IconX } from '@tabler/icons-react';
import Avvvatars from 'avvvatars-react';
import { useEffect, useState } from 'react';

export function UserProfile() {
  const theme = useMantineColorScheme();
  const user = useUser();
  const { setTitle } = useTitleActions();
  useEffect(() => {
    setTitle('User Account');
  }, []);
  const [modalOpened, setModalOpened] = useState(false);

  const passwordForm = useForm({
    initialValues: { old_password: '', old_password_again: '', new_password: '' },
    transformValues: (values) => ({
      old: values.old_password,
      new: values.new_password
    })
  });

  const form = useForm({
    initialValues: {
      organization_id: user.data?.organizationId,
      name: user.data?.name,
      email: user.data?.email
    },
    transformValues: (values) => ({
      name: values.name,
      email: values.email
    })
  });

  async function handleSubmit(data: { name: string | undefined; email: string | undefined }) {
    if (!data.name || !data.email) {
      return;
    }
    try {
      await client
        .put(`users/${user.data?.id}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            name: data.name,
            email: data.email
          })
        })
        .json();

      user.refetch();

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

  async function handlePasswordSubmit(data: { old: string; new: string }) {
    try {
      await client
        .put(`users/${user.data?.id}/password`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            old: data.old,
            new: data.new
          })
        })
        .json();

      user.refetch();
      setModalOpened(false);
      passwordForm.reset();
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

  if (user.isLoading) {
    return <Loader />;
  }

  if (!user.data) {
    return <div>Erorororor</div>;
  }

  return (
    <Center>
      <NeumorphicCard p="md" radius="md" w="clamp(30%, 600px, 100%)">
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
              <Avvvatars value={user.data.name} size={175} />
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
                <CopyButton value={user.data.organizationId} timeout={2000}>
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
                  color={theme.colorScheme == 'dark' ? 'gray.4' : 'nordicNoir'}
                  size="lg"
                  disabled={!form.isDirty()}>
                  Save Profile
                </Button>
                <Button
                  variant="outline"
                  color={theme.colorScheme == 'dark' ? 'gray.4' : 'nordicNoir'}
                  onClick={() => setModalOpened(true)}
                  size="lg">
                  Update Password
                </Button>
              </Group>
            </Center>
          </Stack>
        </form>
      </NeumorphicCard>
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
        centered>
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
              color={theme.colorScheme == 'dark' ? 'gray.4' : 'nordicNoir'}
              size="lg">
              Save Password
            </Button>
          </Stack>
        </form>
      </Modal>
    </Center>
  );
}
