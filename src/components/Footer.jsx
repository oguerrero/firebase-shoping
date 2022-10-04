import React, { useContext } from 'react'
import { IoHomeSharp, IoCartSharp } from 'react-icons/io5'
import { AppContext } from '../App'

const Footer = () => {
  const { setRoute } = useContext(AppContext)

  return (
    <footer className='fixed bottom-0 w-full h-16 bg-yellow-400 flex justify-center px-8 gap-8 items-center'>
      <div
        className='bg-white text-3xl p-2 rounded-full text-yellow-900 cursor-pointer'
        onClick={() => setRoute('home')}>
        <IoHomeSharp />
      </div>
      <div
        className='bg-white text-3xl p-2 rounded-full text-yellow-900 cursor-pointer'
        onClick={() => setRoute('shop')}>
        <IoCartSharp />
      </div>
    </footer>
  )
}

export default Footer
