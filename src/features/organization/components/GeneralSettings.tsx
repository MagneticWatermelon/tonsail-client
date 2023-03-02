import { NeumorphicCard } from '@/components/NeumorphicCard';
import {
  ActionIcon,
  Button,
  Center,
  CopyButton,
  Stack,
  Text,
  TextInput,
  Tooltip,
  useMantineColorScheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import Avvvatars from 'avvvatars-react';
import { Organization } from '../types';

type Props = {
  org: Organization;
};

export function GeneralSettings({ org }: Props) {
  const theme = useMantineColorScheme();
  const form = useForm({
    initialValues: {
      id: org.id,
      name: org.name
    }
  });
  return (
    <NeumorphicCard p="md">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack spacing="lg" pt="md">
          <Stack spacing="md">
            <Text size="md" weight={700}>
              Organization Logo
            </Text>
            <Avvvatars value={org.name} size={175} />
          </Stack>
          <TextInput
            {...form.getInputProps('id')}
            label={
              <Text size="md" weight={700}>
                Organization ID
              </Text>
            }
            disabled
            rightSection={
              <CopyButton value={org.id} timeout={2000}>
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
                Organization Name
              </Text>
            }
            placeholder="Organization Name"
          />
          <Center>
            <Button
              type="submit"
              variant="outline"
              color={theme.colorScheme == 'dark' ? 'gray.4' : 'blue'}
              size="lg"
              disabled={!form.isDirty()}>
              Save
            </Button>
          </Center>
        </Stack>
      </form>
    </NeumorphicCard>
  );
}
