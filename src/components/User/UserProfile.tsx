import { Paper, Text, Stack } from '@mantine/core';
import { useAuth } from '../../util/AuthProvider';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <Paper>
      <Stack>
        <Text>{user.id}</Text>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </Stack>
    </Paper>
  );
}
