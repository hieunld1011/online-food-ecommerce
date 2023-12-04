'use client';

import { createContext, useState, useContext } from 'react';

export type BarContextProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (c: boolean) => void;
};

export const BarContext = createContext<BarContextProps>({
  isSidebarOpen: false,
  setIsSidebarOpen: (c: boolean) => {},
});

const BarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <BarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </BarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(BarContext);

export default BarProvider;
