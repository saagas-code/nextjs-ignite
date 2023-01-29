
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react';
import {useContext} from 'react'
import { withSSRAuth } from '../src/utils/withSSRAuth';
import { GetServerSideProps } from 'next';
import { setupAPIClient } from '../src/services/api';
import decode from 'jwt-decode'




export default function Metrics() {


  const permissions=['metrics.list']

  
  return (
    <>  
      <div className="flex  flex-col h-full">
          Metrics
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
}, {
  permissions: ['metrics.list'],
  // roles: ['administrator']
})

