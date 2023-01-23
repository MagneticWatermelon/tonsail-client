import { Paper, Text, Stack } from '@mantine/core';
import { useOrganization } from '../../api/organizations/getOrganization';
import { useAuth } from '../../util/AuthProvider';

export default function OrganizationProfile() {
  const { user } = useAuth();
  const org = useOrganization(user.organizationId);

  return (
    <Paper>
      <Stack>
        <Text>{org.data?.id}</Text>
        <Text>{org.data?.name}</Text>
      </Stack>
    </Paper>
  );
}
