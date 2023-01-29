"use client"

import { Header } from './../../../src/components/Header';
import Sidebar from './../../../src/components/Sidebar';
import { Input } from './../../../src/components/Form/Input';
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import {object, ref, string} from 'yup'
import { useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import { useMutation } from 'react-query'
import { queryClient } from './../../../src/services/queryClient';
import { useRouter } from 'next/navigation';
import { api } from '../../../src/services/apiClient';

type CreateUserFormData = {
  name: string
  email: string;
  password: string;
  password_confirmation: string;
}
const signInFormSchema = object({
  name: string().required("Campo obrigatório").min(4, "Minimo de 4 caracteres."),
  email: string().required("Campo obrigatório").email("E-mail inválido."),
  password: string().required("Campo obrigatório").min(4, "Minimo de 4 caracteres."),
  password_confirmation: string().required("Campo obrigatório").oneOf([ref('password')], 'Senhas não batem')
})

export default function CreateUser() {
  const router = useRouter()

  const {mutateAsync: createUser} = useMutation(async(user: CreateUserFormData) => {
    const response = await api.post('/clients', {
      
      ...user,
      phone: '12345678901',
      address: 'Test',
      cpf: `${Math.floor(Math.random() * 100000000000)}`,
      
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState: {errors} } = useForm<CreateUserFormData>({
    resolver: yupResolver(signInFormSchema)
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (data: CreateUserFormData) => {
    createUser(data)
    router.push("/users")
  }


  return (
    <div className="">
      <Header />

      <div className="flex w-full my-6 p-2 max-w-[1480px]  mx-auto">
        <Sidebar />

        <div className="flex-1 rounded-[2rem] p-4 bg-gray-800">
          <h2 className="text-lg font-normal">Criar usuário</h2>

          <div className="h-[1px] w-full bg-gray-700"></div>

          <form onSubmit={handleSubmit(handleSignIn)} className="w-full mt-4 flex flex-col flex-wrap gap-4">
            <div className="min-w-[240px] flex mmd:flex-col flex-1 gap-4">
              <span className="flex-1"><Input error={errors.name} register={register("name")} type="text" name='name' label="Nome Completo" /></span>
              <span className="flex-1"><Input error={errors.email} register={register("email")} type="email" name='email' label="E-mail" /></span>
            </div>
            
            <div className="min-w-[240px]  flex mmd:flex-col flex-1 gap-4">
           
              <span className="flex-1"> <Input error={errors.password} register={register("password")} type="password" name='password' label="Senha" /></span>
              <span className="flex-1"><Input error={errors.password_confirmation} register={register("password_confirmation")} type="password" name='password_confirmation' label="Confirmacão da senha" /></span>
              
            </div>

            <div className=" mt-2 flex items-end justify-end gap-4">
              <button className="px-2 py-1 rounded-lg bg-gray-600 hover:opacity-80 transition-all duration-200 ease-in-out">Cancelar</button>
              <button disabled={isLoading} type="submit" className="flex justify-center px-2 py-1 min-w-[70px] rounded-lg bg-pink-600 hover:opacity-80 transition-all duration-200 ease-in-out disabled:opacity-50">
              {isLoading ? 
                <VscLoading className="animate-spin text-2xl " /> :
                'Salvar'
              }
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  ) 
}
