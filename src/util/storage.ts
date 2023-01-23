const storagePrefix = 'tonsail_app_';

const storage = {
  getSession: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}session`) as string);
  },
  setSession: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}session`, JSON.stringify(token));
  },
  clearSession: () => {
    window.localStorage.removeItem(`${storagePrefix}session`);
  },
};

export default storage;
