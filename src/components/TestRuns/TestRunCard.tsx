import {
  ActionIcon,
  ColorSwatch,
  Container,
  Group,
  MantineTheme,
  Menu,
  Paper,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import {
  IconDotsVertical,
  IconPlayerPlayFilled,
  IconSettings,
  IconTrash
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface Props {
  test: any;
}

function getTestStatusColor(theme: MantineTheme, runs: any[]) {
  if (runs.length === 0) {
    return theme.colors.dark[2];
  } else {
    if (runs[0].status === 'FINISHED') {
      return theme.colors.green[6];
    } else {
      return theme.colors.yellow[5];
    }
  }
}

export default function TestRunCard({ test }: Props) {
  const theme = useMantineTheme();
  return (
    <Paper mih={200} w={300} shadow="xs" withBorder>
      <Stack>
        <Group m="md" noWrap>
          <ColorSwatch
            style={{ flexShrink: 0 }}
            radius="xl"
            size={18}
            color={getTestStatusColor(theme, test.runs)}
          />
          <Text
            component={Link}
            to={`/tests/${test.id}`}
            style={{ display: 'block', flexGrow: 1 }}
            lineClamp={1}
            truncate>
            {test.name}
          </Text>
          <Menu withArrow width={160} position="bottom" transition="pop">
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconSettings size={20} />}>Configure</Menu.Item>
              <Menu.Item icon={<IconPlayerPlayFilled size={20} />}>Run Test</Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size={20} />}>
                Delete Test
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        {test.runs.length === 0 ? (
          <Container>
            <div>No Runs</div>
          </Container>
        ) : (
          <div>Last Run Data</div>
        )}
      </Stack>
    </Paper>
  );
}
