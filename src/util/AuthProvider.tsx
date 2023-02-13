import { createContext, ReactNode, useContext, useState } from 'react';
import { client } from '../lib/apiClient';

interface FormData {
  email: string;
  password: string;
}

const asyncAuthProvider = {
  async signin(form: FormData): Promise<User | undefined> {
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
  },
  async signout() { }
};

interface AuthContextType {
  user: any;
  updateUser: (data: any) => void;
  signin: (data: FormData, callback: VoidFunction) => Promise<void>;
  signout: (callback: VoidFunction) => Promise<void>;
}

let AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<any>(null);

  let signin = async (data: FormData, callback: VoidFunction) => {
    let resp = await asyncAuthProvider.signin(data);
    if (resp) {
      setUser(resp);
      callback();
    }
  };

  let updateUser = (data: any) => {
    setUser(data);
  };

  let signout = async (callback: VoidFunction) => {
    // if (resp?.ok) {
    setUser(null);
    callback();
    // }
  };

  let value = { user, updateUser, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('Use it inside the AuthContextProvider');
  }
  return ctx;
};
export { useAuth, AuthProvider };
