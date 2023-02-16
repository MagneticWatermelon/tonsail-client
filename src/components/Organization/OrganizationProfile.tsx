import { Paper, Text, Stack } from '@mantine/core';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTitleActions } from '../../stores/AppTitleStore';
import { Organization } from '../../types/Organization';

export default function OrganizationProfile() {
  const org = useLoaderData() as Organization;
  const { setTitle } = useTitleActions();
  useEffect(() => {
    setTitle('Organization');
  }, []);
  return (
    <Paper>
      <Stack>
        <Text>{org.id}</Text>
        <Text>{org.name}</Text>
      </Stack>
    </Paper>
  );
}
