import { Scenario, Test } from '@/features/test';
import produce from 'immer';
import create from 'zustand';

interface TestsState {
  tests: Test[];

  actions: {
    addTest: (t: Test) => void;
    addScenario: (id: string, s: Scenario) => void;
    getTest: (id: string) => Test[];
  };
}

const useTestsStore = create<TestsState>()((set, get) => ({
  tests: [],
  actions: {
    addTest: (t) => {
      set(
        produce((draft) => {
          draft.tests.push(t);
        })
      );
    },
    addScenario: (id: string, scenario: Scenario) =>
      set(
        produce((draft: TestsState) => {
          const t = draft.tests.find((t) => t.id === id);
          if (t != undefined) {
            t.scenarios.push(scenario);
          }
        })
      ),
    getTest: (s) => get().tests.filter((v) => v.id == s)
  }
}));

export const useTest = () => useTestsStore((state) => state.tests);

export const useTestActions = () => useTestsStore((state) => state.actions);
