import { User } from '@/features/user';
import { client } from '@/lib/apiClient';
import { RegisterFormData } from '../types';

export async function registerWithEmailAndPassword(
  data: RegisterFormData
): Promise<User | undefined> {
  return client
    .post('register', {
      body: new URLSearchParams({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
    .json();
}
