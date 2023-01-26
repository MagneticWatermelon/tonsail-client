import { useDocumentTitle } from '@mantine/hooks';
import create from 'zustand';

export type AppTitle = {
  title: string;
};

interface AppTitleState {
  appTitle: AppTitle;

  actions: {
    setTitle: (s: string) => void;
  };
}

const useAppTitleStore = create<AppTitleState>()((set) => ({
  appTitle: { title: document.title },
  actions: {
    setTitle: (s) =>
      set(() => {
        useDocumentTitle(s);
        return { appTitle: { title: s } };
      })
  }
}));

export const useTitle = () => useAppTitleStore((state) => state.appTitle.title);

export const useTitleActions = () => useAppTitleStore((state) => state.actions);
