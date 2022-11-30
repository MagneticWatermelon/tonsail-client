import {
  ActionIcon,
  Text,
  Group,
  Paper,
  useMantineColorScheme,
  Badge,
  Divider,
  Button
} from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { nanoid } from 'nanoid';
import { useScenarioActions, useScenarios } from '../../stores/ScenariosStore';
import ScenarioOptions from './ScenarioOptions';

export default function OptionsSideBar() {
  const { colorScheme } = useMantineColorScheme();
  const scenarios = useScenarios();
  const { addScenario } = useScenarioActions();

  return (
    <Paper
      shadow="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - var(--mantine-header-height, 0px) - 32px)',
        minWidth: "max-content"
      }}
    >
      <Group p="sm">
        <Group spacing={5}>
          <Text color="gray.5" fz="xs" fw="bold" pl="lg" transform="uppercase">
            Scenarios
          </Text>
          <Badge
            sx={{ width: 20, height: 20, pointerEvents: 'none' }}
            variant="light"
            color={colorScheme === 'dark' ? 'indigo.3' : 'indigo.8'}
            size="lg"
            p={0}
          >
            {scenarios.length}
          </Badge>
        </Group>
        <ActionIcon
          variant="outline"
          color="indigo.8"
          onClick={() => addScenario({ id: nanoid(6), name: `SCENARIO_${scenarios.length + 1}` })}
          size={22}
          style={{ marginLeft: 'auto' }}
        >
          <IconPlus />
        </ActionIcon>
      </Group>
      <Divider />
      <ScenarioOptions scenarios={scenarios} />
      <Button.Group>
        <Button fullWidth variant="default">
          New
        </Button>
        <Button fullWidth variant="default">
          Import
        </Button>
      </Button.Group>
    </Paper>
  );
}
