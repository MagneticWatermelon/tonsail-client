import { useQuery } from '@tanstack/react-query';
import { client } from '../../lib/apiClient';
import { Organization } from '../../types/Organization';

async function getOrganization(id: string): Promise<Organization> {
  return await client.get(`organizations/${id}`).json();
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ['organization', id],
    queryFn: () => getOrganization(id)
  });
}
