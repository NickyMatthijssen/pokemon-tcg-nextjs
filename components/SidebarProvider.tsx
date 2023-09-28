"use client";

import React, { useContext, useState } from "react";

export type SidebarSettings = {
  isToggled: boolean;
  toggle: (value?: boolean) => void;
};

const SidebarContext = React.createContext({} as SidebarSettings);

export const useSidebar = (): SidebarSettings => useContext(SidebarContext);

export function SidebarProvider({ children }: React.PropsWithChildren) {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = (value?: boolean) =>
    setIsToggled((isToggled) => (value === undefined ? !isToggled : value));

  return (
    <SidebarContext.Provider value={{ isToggled, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}
