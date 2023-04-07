import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Group,
  Paper,
  Text,
  useMantineColorScheme
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { nanoid } from 'nanoid';
import { useStageActions, useStages } from '../../stores/StagesStore';
import { formatDuration } from '../../util/timeFormat';
import { StageDragDrop } from './StageDragDrop';

function randomDuration() {
  let rand = Math.floor(Math.random() * 300) + 1;
  return `${rand}`;
}

export default function StagesBar() {
  const { colorScheme } = useMantineColorScheme();
  const stages = useStages();
  const { addStage } = useStageActions();

  return (
    <Paper
      shadow="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - var(--mantine-header-height, 0px) - 32px)',
        width: '180px'
      }}>
      <Group p="sm">
        <Group spacing={5}>
          <Text color="gray.5" fz="xs" fw="bold" pl="lg" transform="uppercase">
            Stages
          </Text>
          <Badge
            sx={{ width: 22, height: 22, pointerEvents: 'none' }}
            variant="outline"
            color={colorScheme === 'dark' ? 'limeZest.6' : 'dark.9'}
            size="lg"
            p={0}>
            {stages.length}
          </Badge>
        </Group>
        <ActionIcon
          variant="outline"
          color={colorScheme === 'dark' ? 'limeZest.6' : 'dark.9'}
          onClick={() =>
            addStage({
              id: nanoid(8),
              userAmount: Math.floor(Math.random() * 100),
              duration: formatDuration(randomDuration())
            })
          }
          size={22}
          style={{ marginLeft: 'auto' }}>
          <IconPlus />
        </ActionIcon>
      </Group>
      <Divider />
      <StageDragDrop />
      <Button
        color="neonGreen.6"
        onClick={() => {
          addStage({
            id: nanoid(8),
            userAmount: Math.floor(Math.random() * 100),
            duration: formatDuration(randomDuration())
          });
        }}
        variant="outline">
        New
      </Button>
    </Paper>
  );
}
