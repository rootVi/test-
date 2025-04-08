import {Pacifico} from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const type = Pacifico({
    weight:'400',
    preload:false,
})

const logo = () => {
  return (
    
    <Link href="/" className={`${type.className} text-5xl`} >
      
        Kagen
    
    
    </Link>
    
  )
}

export default logo