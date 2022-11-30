import { ActionIcon, Badge, Button, Center, Divider, Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { nanoid } from 'nanoid';
import { useRequestActions, useRequests } from '../../stores/RequestsStore';
import { OptionsDnD } from './OptionsDragDrop';

function getRandomVerb() {
  let rand = Math.floor(Math.random() * 7);
  switch (rand) {
    case 0:
      return 'GET';
    case 1:
      return 'POST';
    case 2:
      return 'PUT';
    case 3:
      return 'DELETE';
    case 4:
      return 'HEAD';
    case 5:
      return 'OPTIONS';
    default:
      return 'PATCH';
  }
}

export default function OptionsDetail() {
  const requests = useRequests();
  const { addRequest } = useRequestActions();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Paper
      shadow="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - var(--mantine-header-height, 0px) - 32px)'
      }}
    >
      <Group p="sm">
        <Group spacing={5}>
          <Text color="gray.5" fz="xs" fw="bold" pl="lg" transform="uppercase">
            Requests
          </Text>
          <Badge
            sx={{ width: 20, height: 20, pointerEvents: 'none' }}
            variant="light"
            color={colorScheme === 'dark' ? 'indigo.3' : 'indigo.8'}
            size="lg"
            p={0}
          >
            {requests.length}
          </Badge>
        </Group>
        <ActionIcon
          variant="outline"
          color="indigo.8"
          onClick={() => addRequest({ id: nanoid(6), method: "GET", url:"" })}
          size={22}
          style={{ marginLeft: 'auto' }}
        >
          <IconPlus />
        </ActionIcon>
      </Group>
      <Divider />
      <OptionsDnD />
      <Button.Group>
        <Button fullWidth variant="default">
          Group
        </Button>
        <Button
          onClick={() => {
            addRequest({
              id: nanoid(6),
              method: getRandomVerb(),
              url: 'https://test.k6.io/contacts.php'
            });
          }}
          fullWidth
          variant="default"
        >
          Request
        </Button>
        <Button fullWidth variant="default">
          Sleep
        </Button>
      </Button.Group>
    </Paper>
  );
}
