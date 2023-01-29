import Image from "next/image";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthProvider";

export function Profile() {
  const {user} = useContext(AuthContext)

  return (
    <div className="flex items-center ml-2 ">
          <div className="hidden lg:block mr-4 align-middle">
            <p>Matheus Almeida</p>
            <p className="text-300">
              {user?.email}
            </p>
          </div>

          
          <Image width={50} height={50} className="rounded-full min-w-[50px] min-h-[50px]" src="https://github.com/saagas-code.png" alt="foto de perfil" />
          
        </div>
  )
}