import { client } from '../../lib/apiClient';

export default async function logoutUser() {
  try {
    await client.post('logout', {});
  } catch (error) { }
}
