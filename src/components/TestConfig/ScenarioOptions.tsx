import { Divider, Paper, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';
import InputTooltip from '../common/InputTooltip';
import StageChart from '../StageConfig/StageChart';

export default function ScenarioOptions() {
  const theme = useMantineTheme();
  return (
    <Paper
      shadow="xs"
      style={{
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - var(--mantine-header-height, 0px) - 32px)',
        minWidth: '0'
      }}>
      <Stack p="sm">
        <Divider label="General" labelProps={{ fz: 'lg', tt: 'uppercase', fw: 500 }} />
        <TextInput label={<Text>Name</Text>} radius="xs" size="md" placeholder="Unnamed Scenario" />
        <TextInput
          label={
            <InputTooltip
              textLabel="Timeout"
              color={theme.colorScheme === 'dark' ? 'dark.5' : 'dark.6'}
              label={
                <Stack>
                  <Text fz="xs">
                    Time to wait for finishing execution before stopping forcefully.{' '}
                  </Text>
                  <Text fz="xs">Example: 1hour 30m 15sec</Text>
                  <Text fz="xs">
                    Supported suffixes: seconds, second, sec, s, minutes, minute, min, m,
                    hours,hour, hr, h, days, day, d
                  </Text>
                </Stack>
              }
              multiline
              width={250}
              transitionProps={{
                transition: 'fade',
                duration: 200
              }}>
              {' '}
            </InputTooltip>
          }
          radius="xs"
          size="md"
          placeholder="30s"
        />
      </Stack>
      <Stack p="sm" style={{ flexGrow: 1 }}>
        <Divider label="Stages" labelProps={{ fz: 'lg', tt: 'uppercase', fw: 500 }} />
        <StageChart />
      </Stack>
    </Paper>
  );
}
