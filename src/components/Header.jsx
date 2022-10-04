import React, { useContext } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { SiFirebase } from 'react-icons/si'
import { AppContext } from '../App'
import toast from 'react-hot-toast'

const Header = () => {
  const { setRoute, user, setUser } = useContext(AppContext)
  const auth = getAuth()

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setRoute('home')
        setUser(null)
        toast('Closed Session')
      })
      .catch((error) => {
        // An error happened.
        toast('Ups. Something hapend')
      })
  }

  return (
    <header className='fixed top-0 flex items-center justify-between w-full h-20 px-2 bg-transparent shadow-lg md:px-8'>
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={() => setRoute('home')}>
        <SiFirebase className='text-2xl text-yellow-500' />
        <span className='text-xl font-semibold text-yellow-500'>FireShop</span>
      </div>
      <div className='flex gap-4'>
        {user ? (
          <button
            className='px-4 py-1 font-semibold text-white transition rounded-full bg-rose-600 hover:bg-rose-700'
            onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <button
              className='px-4 py-1 font-semibold text-white transition bg-yellow-500 rounded-full shadow-lg hover:bg-orange-500'
              onClick={() => setRoute('register')}>
              Sign Up
            </button>
            <button
              className='px-4 py-1 font-semibold text-white transition rounded-full shadow-lg bg-sky-400 hover:bg-cyan-700'
              onClick={() => setRoute('login')}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
