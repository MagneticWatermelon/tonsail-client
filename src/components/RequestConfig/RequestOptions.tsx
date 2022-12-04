import { Paper, Stack, Text, TextInput } from '@mantine/core';
import { GradientSegmentedControl } from './GradientSegmentedControl';
import RequestDetails from './RequestDetail';

const data = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];

export default function RequestOptions() {
  return (
    <Paper
      shadow="xs"
      style={{
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - var(--mantine-header-height, 0px) - 32px)'
      }}
    >
      <Stack p="sm">
        <TextInput
          label={<Text>Name</Text>}
          radius="xs"
          size="md"
          placeholder="Unnamed Request"
        ></TextInput>
        <TextInput
          label={<Text>URL</Text>}
          radius="xs"
          size="md"
          placeholder="Request URL"
        ></TextInput>
        <GradientSegmentedControl data={data} radius="xs" />
      </Stack>
      <RequestDetails />
    </Paper>
  );
}
