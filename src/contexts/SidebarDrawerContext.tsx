"use client"

import { useDisclosure } from "@chakra-ui/react";
import {usePathname }  from "next/navigation";
import { createContext, ReactNode, useState, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextProps = {
  isVisible: boolean,
  switchMenu: () => void,
}

export const SidebarDrawerContext = createContext<SidebarDrawerContextProps>(
  {} as SidebarDrawerContextProps
);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const disclosure = useDisclosure()
  const path = usePathname()

  useEffect(() => {
    disclosure.onClose()
  }, [path])

  function switchMenu() {
    if(isVisible) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
    
  }

  const value = {isVisible, switchMenu}

  return (
    <SidebarDrawerContext.Provider value={value} >
      {children}
    </SidebarDrawerContext.Provider>
  )
}