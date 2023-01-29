import { ReactNode } from "react";

import { AuthProvider } from "./AuthProvider";
import { SidebarDrawerProvider } from "./SidebarDrawerContext";

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({children}: ProviderProps) => {
  return (

    <AuthProvider>
      <SidebarDrawerProvider>
        {children}
      </SidebarDrawerProvider>
    </AuthProvider>
  )
}