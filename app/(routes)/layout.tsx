import React from 'react'
import Navbar from './_components/menu/navbar'
import Footer from './_components/Footer'

interface RoutesLayoutProps{
    children:React.ReactNode
}

const RoutesLayout = ({children}:RoutesLayoutProps) => {
  return (
    <>
    
    <Navbar/>
   
    <div className='min-h-screen'>
    {children}
   </div>
        
   <Footer/>
    </>
  )
}

export default RoutesLayout