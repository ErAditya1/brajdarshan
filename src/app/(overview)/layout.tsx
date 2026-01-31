import React from 'react'

import {Footer} from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'


function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-col min-h-screen bg-background text-foreground font-sans antialiased'>
        <Header/>
        <div className='grow'>

        {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout