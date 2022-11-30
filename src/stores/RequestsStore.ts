import create from 'zustand';

export type Request = {
  id: string;
  name?: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
};

interface RequestsState {
  requests: Request[];

  actions: {
    addRequest: (s: Request) => void;
    reorderRequests: (from: number, to: number) => void;
    deleteRequest: (s: Request) => void;
  };
}

const useRequestsStore = create<RequestsState>()((set) => ({
  requests: [],
  actions: {
    addRequest: (s) => set((state) => ({ requests: [...state.requests, s] })),
    reorderRequests: (f, t) =>
      set((state) => {
        const cloned = [...state.requests];
        const item = state.requests[f];

        cloned.splice(f, 1);
        cloned.splice(t, 0, item);

        return { requests: cloned };
      }),
    deleteRequest: (s) =>
      set((state) => ({ requests: state.requests.filter((curr) => curr.id !== s.id) }))
  }
}));

export const useRequests = () => useRequestsStore((state) => state.requests);

export const useRequestActions = () => useRequestsStore((state) => state.actions);
