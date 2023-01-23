import { configureAuth } from 'react-query-auth';
import storage from '../util/storage';
import { client } from './axios';

async function handleUserResponse(data: any) {
  storage.setSession(data);
  return data;
}

export type Credentials = {
  email: string;
  password: string;
};

async function userFn() {
  if (storage.getSession()) {
    const sessionData = storage.getSession();
    const response = await client.get(`users/${sessionData.id}`).json();
    return response;
  }
  return null;
}

async function loginFn(data: Credentials) {
  const response = await client.post('login', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: data.email,
      password: data.password
    })
  });
  // const response = await fetch('http://127.0.0.1:8000/login', {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'no-cors',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   body: new URLSearchParams({
  //     email: data.email,
  //     password: data.password
  //   })
  // });
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: Credentials) {
  const response = await client.post('register', {
    body: new URLSearchParams({
      email: data.email,
      password: data.password
    })
  }).json();
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearSession();
  window.location.assign(window.location.origin as unknown as string);
  client.post('logout');
}

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn,
  loginFn,
  registerFn,
  logoutFn
});
