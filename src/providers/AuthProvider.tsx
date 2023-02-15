import loginWithEmailAndPassword from '../api/auth/loginUser';
import logoutUser from '../api/auth/logoutUser';
import registerWithEmailAndPassword from '../api/auth/registerUser';
import { getMe } from '../api/user/getMe';
import { LoginFormData, RegisterFormData } from '../types/Auth';
import { configureAuth } from '../util/AuthConfig';

async function userFn() {
  const user = await getMe();
  return user ?? undefined;
}

async function loginFn(data: LoginFormData) {
  return await loginWithEmailAndPassword(data);
}

async function registerFn(data: RegisterFormData) {
  return await registerWithEmailAndPassword(data);
}

async function logoutFn() {
  await logoutUser();
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } = configureAuth({
  userFn,
  loginFn,
  registerFn,
  logoutFn
});
