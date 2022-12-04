import create from 'zustand';

export type Stage = {
  id: string;
  userAmount: number;
  duration: string;
};

interface StagesState {
  stages: Stage[];

  actions: {
    addStage: (s: Stage) => void;
    reorderStages: (from: number, to: number) => void;
    deleteStage: (s: Stage) => void;
  };
}

const useStagesStore = create<StagesState>()((set) => ({
  stages: [],
  actions: {
    addStage: (s) => set((state) => ({ stages: [...state.stages, s] })),
    reorderStages: (f, t) =>
      set((state) => {
        const cloned = [...state.stages];
        const item = state.stages[f];

        cloned.splice(f, 1);
        cloned.splice(t, 0, item);

        return { stages: cloned };
      }),
    deleteStage: (s) =>
      set((state) => ({ stages: state.stages.filter((curr) => curr.id !== s.id) }))
  }
}));

export const useStages = () => useStagesStore((state) => state.stages);

export const useStageActions = () => useStagesStore((state) => state.actions);
