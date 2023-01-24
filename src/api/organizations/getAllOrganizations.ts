import { useQuery } from '@tanstack/react-query';
import { client } from '../../lib/axios';
import { Organization } from '../../types/Organization';

async function getAllOrganizations(): Promise<Organization[]> {
  const res = await client.get('organizations');
  return res.json();
}

export function useOrganizations() {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: getAllOrganizations
  });
}
