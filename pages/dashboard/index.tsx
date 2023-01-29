
import dynamic from 'next/dynamic'
import React from 'react';
import {useContext} from 'react'
import { Header } from '../../src/components/Header';
import Sidebar from '../../src/components/Sidebar';
import { SidebarDrawerContext } from './../../src/contexts/SidebarDrawerContext';
import { options, series } from './options';
import { withSSRAuth } from '../../src/utils/withSSRAuth';
import { GetServerSideProps } from "next";
import { setupAPIClient } from '../../src/services/api';
import { AuthContext } from '../../src/contexts/AuthProvider';


const Chart = dynamic(() => import('react-apexcharts'), { 
  ssr: false 
})

export default function Dashboard() {
  const { isVisible, switchMenu } = useContext(SidebarDrawerContext)
  const {user} = useContext(AuthContext)

  const permissions=['metrics.list']

  
  return (
    <>  
      <div className="flex  flex-col h-full">

        <Header />

        {/* <Can permissions={permissions}>
          <div className="">Métricas</div>
        </Can> */}
        
        <div className="flex w-full p-2 mmd:p-4 my-6 max-w-[1480px]  mx-auto">
          <Sidebar />

          <div className="gap-4  flex flex-1 items-start flex-wrap  ">
            
            <div className="p-6 pb-4 bg-gray-800 rounded-2xl flex-1 min-w-[300px] mmd:mr-2 ">
              <p className="text-lg">Inscritos da semana</p>
              <Chart options={options as any} series={series} type='area' width={'100%'} height={160}/>
            </div>
            
            <div className="p-6 pb-4 bg-800 rounded-2xl flex-1 min-w-[300px] ">
              <p className="text-lg">Inscritos da semana</p>

              <Chart options={options as any} series={series} type='area' width={'100%'} height={160}/>

            </div>
            
          </div>

        </div>
      </div>
    </>
  )
} 

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  // const response = await apiClient.get("/auth/session")
  
  return {
    props: {}
  }
})

