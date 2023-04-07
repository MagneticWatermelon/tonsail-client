import { Center, Group, Text, Tooltip, TooltipProps, useMantineTheme } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface InputTooltipProps extends TooltipProps {
  textLabel: string;
}

export default function InputTooltip(props: InputTooltipProps) {
  const theme = useMantineTheme();
  return (
    <Group style={{ gap: 5 }}>
      <Text>{props.textLabel}</Text>
      <Tooltip {...props}>
        <Text color="dimmed" sx={{ cursor: 'help' }}>
          <Center>
            <IconInfoCircle color={theme.colors.limeZest[6]} size={20} stroke={2} />
          </Center>
        </Text>
      </Tooltip>
    </Group>
  );
}
