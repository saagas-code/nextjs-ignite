import { createContext, ReactNode, useEffect, useState } from "react";

import { useRouter } from 'next/navigation';
import {setCookie, parseCookies, destroyCookie} from 'nookies'
import { api } from "../services/apiClient";

interface AuthProviderProps {
  children: ReactNode;
}

export type User = {
  email: string
  permissions?: string[]
}

type SignInCredentials = {
  email: string;
  password: string;
}

interface AuthProviderContextProps {
  user: User | undefined;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthProviderContextProps>(
  {} as AuthProviderContextProps
)


export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;
  const router = useRouter()


  

  useEffect(() => {
    const {token} = parseCookies()

    if(token) {
      api.get("/auth/session")
        .then(response => {
          setUser({
            ...response.data,
            permissions: ['metrics.list']
          })
        })
        .catch(() => {
          destroyCookie(undefined, 'token')
          router.push("/")
        }) 
    }
  }, [])

  async function signOut() {
    destroyCookie(undefined, 'token')
    router.push("/")
  }


  async function signIn({email, password}: SignInCredentials) {
    try {
      const {data} = await api.post("/auth/login", {
        email, password
      })

      setCookie(undefined, 'token', data.token, {
        maxAge: 60 * 60 * 24 * 30, // one month
        path: '/'
      })

      setUser({
        email,
        permissions: ['metrics.list']
      })

      api.defaults.headers['Authorization'] = `Bearer ${data.token}`

      router.push("/dashboard")

      // authChannel.postMessage("signIn")
      return
    } catch (err: any) {
      console.log(err.response.data)
    }

  }

  return (
    <AuthContext.Provider value={{signIn, signOut, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
  
}