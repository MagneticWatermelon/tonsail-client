import {
  ActionIcon,
  ColorSwatch,
  Container,
  Group,
  MantineTheme,
  Menu,
  createStyles,
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
import { NeumorphicCard } from '../NeumorphicCard';

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

const useStyles = createStyles(() => ({
  card: {
    minHeight: 200,
    width: 345,
    [`@media (min-width: 1600px)`]: {
      width: 'calc(25% - 20px)'
    },
    [`@media (min-width: 1240px) and (max-width: 1599px)`]: {
      width: 'calc(33% - 20px)'
    },
    [`@media (min-width: 901px) and (max-width: 1239px)`]: {
      width: 'calc(50% - 20px)'
    },
    [`@media (max-width: 900px)`]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
}));

export default function TestRunCard({ test }: Props) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <NeumorphicCard className={classes.card}>
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
          <Menu withArrow width={160} position="bottom" transitionProps={{ transition: 'pop' }}>
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
          <Container>
            <div>Last Run Data</div>
          </Container>
        )}
      </Stack>
    </NeumorphicCard>
  );
}
