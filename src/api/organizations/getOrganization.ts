import { QueryClient, useQuery } from '@tanstack/react-query';
import { client } from '../../lib/apiClient';
import { Organization } from '../../types/Organization';

async function getOrganization(id: string): Promise<Organization> {
  return await client.get(`organizations/${id}`).json();
}

const getOrganizationQuery = (id: string) => {
  return {
    queryKey: ['organization', id],
    queryFn: () => getOrganization(id)
  };
};

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ['organization', id],
    queryFn: () => getOrganization(id)
  });
}

export const runOrganizationLoader =
  (queryClient: QueryClient) =>
    async ({ params }: any) => {
      const query = getOrganizationQuery(params.organizationId);
      return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
    };
