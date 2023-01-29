"use client"

import React from "react";
import '../styles/global.css'
import { SidebarDrawerProvider } from './../src/contexts/SidebarDrawerContext';
import { theme } from './../styles/theme';
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from "../src/services/queryClient";

import { AppProps } from "next/app";
import { Providers } from "../src/contexts";

type Props = {
  children: React.ReactNode
}

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <SidebarDrawerProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </SidebarDrawerProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Providers>
  )
}