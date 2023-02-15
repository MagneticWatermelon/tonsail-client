import { Paper, Text, Stack } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';
import { Organization } from '../../types/Organization';

export default function OrganizationProfile() {
  const org = useLoaderData() as Organization;
  return (
    <Paper>
      <Stack>
        <Text>{org.id}</Text>
        <Text>{org.name}</Text>
      </Stack>
    </Paper>
  );
}
