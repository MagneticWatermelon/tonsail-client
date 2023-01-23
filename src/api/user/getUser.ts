import { useQuery } from '@tanstack/react-query';
import { client } from '../../lib/axios';
import { User } from '../../types/User';

async function getUser(id: String): Promise<User> {
  const res = await client.get(`/users/${id}`);
  return res.json();
}

export function useUser(id: String) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id)
  });
}
