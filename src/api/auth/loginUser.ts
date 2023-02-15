import { client } from '../../lib/apiClient';
import { LoginFormData } from '../../types/Auth';
import { User } from '../../types/User';

export default async function loginWithEmailAndPassword(
  form: LoginFormData
): Promise<User | undefined> {
  try {
    const resp = await client.post('login', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        email: form.email,
        password: form.password
      })
    });
    return resp.json();
  } catch (error) { }
}
