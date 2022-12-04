import { Group, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';
import InputTooltip from '../common/InputTooltip';

export default function StageOptions() {
  const theme = useMantineTheme();
  return (
    <Stack>
      <Group>
      <TextInput
      label="Users"
          radius="xs"
          size="md"
          placeholder="10"
      >
      </TextInput>
        <TextInput
          label={
            <InputTooltip
              textLabel="Duration"
              color={theme.colorScheme === 'dark' ? 'dark.4' : 'blue.8'}
              label={
                <Stack>
                  <Text fz="xs">Example: 1hour 30m 15sec</Text>
                  <Text fz="xs">
                    Supported suffixes: seconds, second, sec, s, minutes, minute, min, m,
                    hours,hour, hr, h, days, day, d
                  </Text>
                </Stack>
              }
              multiline
              width={250}
              transition="fade"
              transitionDuration={200}
            >
              {' '}
            </InputTooltip>
          }
          radius="xs"
          size="md"
          placeholder="30s"
        />
      </Group>
    </Stack>
  );
}
