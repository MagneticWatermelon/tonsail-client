import { User } from '@/features/user';
import { client } from '@/lib/apiClient';
import { LoginFormData } from '../types';

export async function loginWithEmailAndPassword(form: LoginFormData): Promise<User | undefined> {
  return client
    .post('login', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        email: form.email,
        password: form.password
      })
    })
    .json();
}
