import { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'



function App() {
  return (
    <div className='flex justify-center items-center h-screen' >
      <Header/>
      <Link to="register" className='border-none font-inherit cursor-pointer text-green flex items-center gap-6 max-w-max-content py-8 px-12 font-medium text-lg uppercase rounded-lg transition-all bg-blue'>
        Get started 
      </Link>
    </div>
  )
}

export default App
