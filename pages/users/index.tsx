"use client";

import { GetServerSideProps } from "next";
import { RiAddLine } from "react-icons/ri";
import { RiPencilLine } from "react-icons/ri";
import { Header } from "./../../src/components/Header";
import Sidebar from "./../../src/components/Sidebar";
import Link from "next/link";
import { useUsers } from "../../src/hooks/useUsers";
import { useEffect, useState } from 'react';
import { queryClient } from './../../src/services/queryClient';

import { VscLoading } from 'react-icons/vsc';

import Pagination from './../../src/components/Pagination/index';
import { User } from '../../src/types/User';
import { api } from "../../src/services/apiClient";
import { setupAPIClient } from "../../src/services/api";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

const maxTotalUsers = 2


export default function UserList() {

  const [currentPage, setCurrentPage] = useState(1)
  const {data, isLoading, isFetching, error} = useUsers(currentPage, maxTotalUsers)
  
  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/clients/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10 // 10 Minutos
    })
  }

  

  return (
    <div className="overflow-hidden">
      <Header />

      <div className="flex w-full my-6 p-2 max-w-[1480px]  mx-auto">
        <Sidebar />

        <div className="flex-1 min-h-[50px] rounded-[2rem] p-4 bg-gray-800">
          <div className="flex mb-2 justify-between items-center">
            <h2 className="flex items-center justify-center align-middle text-lg tracking-wide font-bold">
              Usuários

              { !isLoading && isFetching && <VscLoading className="animate-spin  ml-2"  />}
            </h2>

            <button className=" bg-pink-600 rounded-lg p-1.5 hover:opacity-80 transition-all duration-200 ease-in-out">
              <Link href="/users/create" className="flex items-center text-sm">
                <RiAddLine className="mr-2 text-lg" />
                Criar novo
              </Link>
            </button>
          </div>

          <div className="relative overflow-x-auto sm:rounded-lg ">
            {isLoading ? (
              <div className="flex justify-center align-middle self-center items-center h-[300px] ">
                <VscLoading className="text-2xl animate-spin" />
              </div>
            ) : error ? (
              <div className="flex justify-center">
                Falha ao obter dados dos usuários
              </div>
            ) : (
              <>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="bg-transparent text-xs text-white uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr className="border-b border-gray-600">
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="mlg:w-3 mlg:h-3 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="checkbox-all-search"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-gray-500">
                        Usuário
                      </th>
                      <th
                        scope="col"
                        className="hidden lg:block px-6 py-3 text-gray-500"
                      >
                        Data de cadastro
                      </th>

                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading && data && data.users.map((user: User, key: number) => {
                      return (
                        <tr
                          key={user._id}
                          className="bg-transparent border-b border-gray-600 text-white "
                        >
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                className="mlg:w-3 mlg:h-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="checkbox-table-search-1"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td>
                            <div className="px-6 py-4">
                              <Link onMouseEnter={() => handlePrefetchUser(user._id)} href="#">
                                <p className="font-bold">{user.name}</p>
                              </Link>
                              <p className="text-sm text-gray-300">
                                {user.email}
                              </p>
                            </div>
                          </td>

                          <td className=" mlg:hidden px-6 py-4">
                            {user.created_at as string}
                          </td>

                          <td className=" py-5 flex justify-center">
                            <button className=" bg-purple-600 rounded-lg p-1 hover:opacity-80 transition-all duration-200 ease-in-out">
                              <Link
                                href="#"
                                className="flex items-center text-sm"
                              >
                                <RiPencilLine className=" text-lg" />
                                <span className="mmd:hidden md: ml-2">
                                  Editar
                                </span>
                              </Link>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                

                <Pagination

                  totalCountOfRegisters={data!.total}
                  registersPerPage={2}
                  currentPage={currentPage} 
                  onPageChange={setCurrentPage} 
                />
                
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
})
