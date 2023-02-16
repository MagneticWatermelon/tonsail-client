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
        s += ' | Tonsail';
        document.title = s;
        return { appTitle: { title: s } };
      })
  }
}));

export const useTitle = () => useAppTitleStore((state) => state.appTitle.title.split('|')[0]);

export const useTitleActions = () => useAppTitleStore((state) => state.actions);
