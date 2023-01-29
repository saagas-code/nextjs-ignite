"use client"

import * as React from 'react'
import { Profile } from './Profile';
import { NotificationsNav } from './NotificationsNav';
import {SearchBox} from './SearchBox'
import { Logo } from './Logo';
import { useContext } from 'react';
import { SidebarDrawerContext } from '../../contexts/SidebarDrawerContext';
import {AiOutlineMenu} from 'react-icons/ai'
import {BiLogOut} from 'react-icons/bi'

import { AuthContext } from '../../contexts/AuthProvider';

export function Header() {
  const { isVisible, switchMenu } = useContext(SidebarDrawerContext)
  const {signOut} = useContext(AuthContext)

  return (
    <header className="w-[100vw] p-2 max-w-[1480px] h-20 mx-auto mt-8 flex items-center ">
      
      <AiOutlineMenu onClick={switchMenu} className="lg:hidden text-2xl mr-2 mt-1 cursor-pointer" />

      <Logo />

      <SearchBox />

      <div className="flex items-center ml-auto ">
      
        <NotificationsNav />

        <Profile />

        <div onClick={() => signOut()} className="">
          <BiLogOut className='text-3xl cursor-pointer' />
        </div>
      </div>

       
    </header> 
  )
}