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
  useMantineColorScheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconCopy } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../../util/AuthProvider';

export default function UserProfile() {
  const { user } = useAuth();
  const theme = useMantineColorScheme();
  const [changed, setChanged] = useState(false);
  const form = useForm({
    initialValues: { organization_id: user.organizationId, name: user.name, email: user.email }
  });

  useEffect(() => {
    if (form.isDirty()) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [form.values]);

  return (
    <Paper shadow="md" p="md" radius="xs" w={400} withBorder>
      <Title order={3} weight={700}>
        General
      </Title>
      <Divider />
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack spacing="lg" pt="md">
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
            <Button
              type="submit"
              variant="outline"
              color={theme.colorScheme == 'dark' ? 'gray.4' : 'blue'}
              size="lg"
              disabled={changed}
            >
              Save Profile
            </Button>
          </Center>
        </Stack>
      </form>
    </Paper>
  );
}
