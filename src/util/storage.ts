import { User } from '../types/User';

const storagePrefix = 'tonsail_app_';

const storage = {
  getSession: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}session`) as string);
  },
  setSession: (user: User) => {
    window.localStorage.setItem(`${storagePrefix}session`, JSON.stringify(user));
  },
  clearSession: () => {
    window.localStorage.removeItem(`${storagePrefix}session`);
  }
};

export default storage;
