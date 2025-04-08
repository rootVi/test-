'use client'

import useAuthStore from '@/hooks/useAuth'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { User, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'


const UserMenu = () => {

    const {jwt, setJwt} =useAuthStore();
    useEffect(()=>{
        if(typeof window !="undefined"){
            const jwt = localStorage.getItem("jwt");
            const user = localStorage.getItem("user");
            if(jwt && user){
                setJwt(jwt)
            }
        }
    },[setJwt])

    const onSignout = ()=>{

        if(typeof window !="undefined"){
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            setJwt("");
        }
    }
  return (
    <>
    {jwt ? (
        <DropdownMenu>
  <DropdownMenuTrigger>
    <UserCircleIcon className='h-8 w-8'/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Hesapım</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <Link href="/my-order">
    <DropdownMenuItem>Siparişim</DropdownMenuItem>
    </Link>
    <DropdownMenuItem onClick={onSignout}>Çıkış</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    ):(
        <Link href="/login">
          <User className='d-flex justify-center h-8 w-8'/>
        
        </Link>
    )}

</>
  )
}

export default UserMenu