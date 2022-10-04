import React, { useContext } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { SiFirebase } from 'react-icons/si'
import { AppContext } from '../App'
import toast from 'react-hot-toast';

const Header = () => {
  const { setRoute, user, setUser } = useContext(AppContext)
  const auth = getAuth();

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
    <header className='flex items-center justify-between w-full h-20 px-8 bg-gray-100 shadow-lg'>
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={() =>  setRoute('home')}>
        <SiFirebase className='text-2xl text-yellow-500' />
        <span className='text-xl font-semibold text-yellow-500'>FireShop</span>
      </div>
      {user ? (
        <div className='flex gap-2'>
          <button
            className='px-4 py-1 font-semibold bg-rose-600 text-white transition rounded-full hover:bg-rose-700'
            onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className='flex gap-2'>
          <button
            className='px-4 py-1 font-semibold text-white transition rounded-full bg-sky-500 hover:bg-sky-700'
            onClick={() => setRoute('login')}>
            Login
          </button>
          <button
            className='px-4 py-1 font-semibold text-white transition bg-orange-500 rounded-full hover:bg-orange-600'
            onClick={() => setRoute('register')}>
            Sign Up
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
