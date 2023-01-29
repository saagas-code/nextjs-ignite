"use client"

import { SidebarNav } from "./SidebarNav";
import { useContext, useState, useEffect } from 'react';
import { SidebarDrawerContext } from './../../contexts/SidebarDrawerContext';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from '@chakra-ui/react';
import  useWindowDimensions  from '../../hooks/window';

export default function Sidebar() {
  const { isVisible, switchMenu } = useContext(SidebarDrawerContext)

  const { width, height } = useWindowDimensions();

  
  if (width! < 1000) {
    return (
      <Drawer isOpen={isVisible} placement="left" onClose={switchMenu}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegacão</DrawerHeader>

            <DrawerBody>
              <SidebarNav/>
            </DrawerBody>

          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <div className="w-64 mr-7">
      <SidebarNav />
    </div>
  )
  
}
 