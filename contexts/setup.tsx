import React, { createContext, useContext, useState } from 'react';

interface SetupData {
  name: string;
  email: string;
}

interface SetupContextType {
  setupData: SetupData;
  setSetupData: (data: SetupData) => void;
}

const SetupContext = createContext<SetupContextType>({
  setupData: { name: '', email: '' },
  setSetupData: () => {},
});

export function SetupProvider({ children }: { children: React.ReactNode }) {
  const [setupData, setSetupData] = useState<SetupData>({ name: '', email: '' });

  return (
    <SetupContext.Provider value={{ setupData, setSetupData }}>
      {children}
    </SetupContext.Provider>
  );
}

export function useSetup() {
  return useContext(SetupContext);
}