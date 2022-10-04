import React, { useContext } from 'react'
import { IoHomeSharp, IoCartSharp, IoMenuSharp } from 'react-icons/io5'
import { AppContext } from '../App'

const Footer = () => {
  const { setRoute } = useContext(AppContext)

  return (
    <footer className='fixed bottom-0 flex items-center justify-center w-full h-16 gap-8 px-8 bg-yellow-400'>
      <div
        className='p-2 text-3xl text-yellow-900 transition rounded-full cursor-pointer hover:bg-white'
        onClick={() => setRoute('home')}>
        <IoHomeSharp />
      </div>
      <div
        className='p-2 text-3xl text-yellow-900 transition rounded-full cursor-pointer hover:bg-white'
        onClick={() => setRoute('shop')}>
        <IoCartSharp />
      </div>
      <div
        className='p-2 text-3xl text-yellow-900 transition rounded-full cursor-pointer hover:bg-white'
        onClick={() => setRoute('list')}>
        <IoMenuSharp />
      </div>
    </footer>
  )
}

export default Footer
