import { client } from '../../lib/apiClient';
import { RegisterFormData } from '../../types/Auth';
import { User } from '../../types/User';

export default async function registerWithEmailAndPassword(
  data: RegisterFormData
): Promise<User | undefined> {
  try {
    let resp = await client.post('register', {
      body: new URLSearchParams({
        name: data.name,
        email: data.email,
        password: data.password
      })
    });
    return resp.json();
  } catch (error) { }
}
