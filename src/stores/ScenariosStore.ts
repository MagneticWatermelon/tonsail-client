import create from 'zustand';

type Scenario = {
  id: string;
  name: string;
};


interface ScenariosState {
  scenarios: Scenario[];

  actions: {
    addScenario: (s: Scenario) => void;
    deleteScenario: (s: Scenario) => void;
    cloneScenario: (s: Scenario, id: string) => void;
  };
}

const useScenariosStore = create<ScenariosState>()((set) => ({
  scenarios: [],
  actions: {
    addScenario: (s) => set((state) => ({ scenarios: [...state.scenarios, s] })),
    deleteScenario: (s) =>
      set((state) => ({ scenarios: state.scenarios.filter((curr) => curr.id !== s.id) })),
    cloneScenario: (s, id) => set((state) => ({ scenarios: [...state.scenarios, { ...s, id }] }))
  }
}));

export const useScenarios = () => useScenariosStore((state) => state.scenarios);

export const useScenarioActions = () => useScenariosStore((state) => state.actions);
