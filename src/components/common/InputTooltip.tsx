import { Center, Group, Text, Tooltip, TooltipProps } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons';

interface InputTooltipProps extends TooltipProps {
  textLabel: string;
}

export default function InputTooltip(props: InputTooltipProps) {
  return (
    <Group style={{ gap: 5 }}>
      <Text>{props.textLabel}</Text>
      <Tooltip {...props}>
        <Text color="dimmed" sx={{ cursor: 'help' }}>
          <Center>
            <IconInfoCircle color="#228BE6" size={20} stroke={2} />
          </Center>
        </Text>
      </Tooltip>
    </Group>
  );
}
