import { Card, Text, Grid, Loader } from '@mantine/core';
import { useOrganizations } from '../../api/organizations/getAllOrganizations';

export function OrganizationsList() {
  const orgsQuery = useOrganizations();

  if (orgsQuery.isLoading) {
    return <Loader />;
  }

  return (
    <Grid>
      {orgsQuery.data?.map((org, idx) => {
        return (
          <Card key={idx}>
            <Text>{org.name}</Text>
          </Card>
        );
      })}
    </Grid>
  );
}
