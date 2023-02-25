import { client } from '@/lib/apiClient';

export async function logoutUser() {
  try {
    await client.post('logout', {});
  } catch (error) { }
}
