'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { calculateReadiness } from './scoring';
import {
  RawInput,
  Requirement,
  Story,
  TestCase,
  ReadinessSummary,
} from '../types';

type AppContextType = {
  rawInput: RawInput | null;
  requirements: Requirement[];
  stories: Story[];
  tests: TestCase[];
  readiness: ReadinessSummary;

  setRawInput: (value: RawInput | null) => void;
  setRequirements: (value: Requirement[]) => void;
  setStories: (value: Story[]) => void;
  setTests: (value: TestCase[]) => void;
  resetAll: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [rawInput, setRawInput] = useState<RawInput | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [tests, setTests] = useState<TestCase[]>([]);

  const readiness = useMemo(
    () => calculateReadiness(requirements, stories, tests),
    [requirements, stories, tests]
  );

  function resetAll() {
    setRawInput(null);
    setRequirements([]);
    setStories([]);
    setTests([]);
  }

  return (
    <AppContext.Provider
      value={{
        rawInput,
        requirements,
        stories,
        tests,
        readiness,
        setRawInput,
        setRequirements,
        setStories,
        setTests,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}