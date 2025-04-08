import Image from 'next/image'
import React from 'react'
import Logo  from "@/components/logo";

interface AuthLayoutProps{

    children:React.ReactNode
}

const AuthLayoutProps = ({children}:AuthLayoutProps) => {
  return (
    

    <div className='h-screen flex justify-center items-center background'>
       <div className='hidden lg:block w-1/2 h-full'>
        <Image
          alt='a'
         src="/a.jpg"
         width={1080}
         height={1920}
         className='h-full w-full object-cover object-top'
         />

      </div>
      <div className='w-full lg:w-1/2 p-10 flex flex-col justify-center items-center text'>
       <div className='flex items-center mb-6 '>
        <Logo/>

       </div>
       {children}
      </div>


     </div>
  )
}

export default AuthLayoutProps