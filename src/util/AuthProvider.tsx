import { createContext, ReactNode, useContext, useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

const asyncAuthProvider = {
  isAuthenticated: false,
  async signin(form: FormData) {
    try {
      const resp = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        credentials: 'include',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          email: form.email,
          password: form.password
        })
      });
      return resp;
    } catch (error) {
      console.log('Error occured', error);
    }
  },
  async signout() {}
};

interface AuthContextType {
  user: any;
  signin: (data: FormData, callback: VoidFunction) => Promise<void>;
  signout: (callback: VoidFunction) => Promise<void>;
}

let AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<any>(null);

  let signin = async (data: FormData, callback: VoidFunction) => {
    let resp = await asyncAuthProvider.signin(data);
    console.log('Got response', resp);
    if (resp?.status == 0) {
      setUser(data);
      callback();
    }
  };

  let signout = async (callback: VoidFunction) => {
    let resp = await asyncAuthProvider.signout();
    // if (resp?.ok) {
    setUser(null);
    callback();
    // }
  };

  let value = { user, signin, signout };

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
