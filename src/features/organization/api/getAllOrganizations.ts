import { client } from '@/lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Organization } from '../types';

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
