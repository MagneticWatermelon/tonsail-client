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
import ScenarioAccordion from './ScenarioAccordion';

export default function ScenariosBar() {
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
        width: "185px",
        minWidth: "185px"
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
          onClick={() => addScenario({ id: nanoid(8), name: `SCENARIO_${scenarios.length + 1}` })}
          size={22}
          style={{ marginLeft: 'auto' }}
        >
          <IconPlus />
        </ActionIcon>
      </Group>
      <Divider />
      <ScenarioAccordion scenarios={scenarios} />
      <Button.Group>
        <Button color="teal" fullWidth variant="outline">
          New
        </Button>
        <Button color="indigo" fullWidth variant="outline">
          Import
        </Button>
      </Button.Group>
    </Paper>
  );
}
