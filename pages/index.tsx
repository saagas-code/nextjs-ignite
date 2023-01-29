// "use client"

import { GetServerSideProps } from "next";
import { useForm } from 'react-hook-form'
import { Input } from './../src/components/Form/Input';
import { VscLoading } from 'react-icons/vsc'
import { useState, useEffect } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import {object, string} from 'yup'
import { useContext } from 'react';
import { withSSRGuest } from "../src/utils/withSSRGuest";
import { AuthContext } from './../src/contexts/AuthProvider';



type SignInFormData = {
  email: string;
  password: string;
}
const signInFormSchema = object({
  email: string().required("Campo obrigatório").email("E-mail inválido."),
  password: string().required("Campo obrigatório")
    .min(4, "Minimo de 4 caracteres."),
})

export default function SignIn() {
  const {signIn} = useContext(AuthContext)

  const { register, handleSubmit, formState: {errors} } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })
  const [isLoading, setIsLoading] = useState(false)
  

  const handleSignIn = async (data: SignInFormData) => {
    signIn(data)
  }
  
  return (
    <div className="flex w-full p-2 h-[100vh] items-center justify-center">
      <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col w-full max-w-[360px] bg-gray-800 p-4 rounded-[8px] ">
        
        <Input error={errors.email}  register={register("email")} label="E-mail" name='email' type="text"  />
        <Input error={errors.password}  register={register("password")} label="Senha" name='password' type="password" />

        <button disabled={isLoading} type="submit" className="flex justify-center mt-4 bg-pink-600 p-2 rounded-lg hover:opacity-90 disabled:opacity-50">
          {isLoading ? 
            <VscLoading className="animate-spin text-2xl " /> :
            'Entrar'
          }
        </button>
      </form>
    </div>
  )
} 

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});



