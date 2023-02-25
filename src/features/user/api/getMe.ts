import { client } from '@/lib/apiClient';
import { User } from '../types';

export async function getMe(): Promise<User | null> {
  return await client.get('me').json();
}
