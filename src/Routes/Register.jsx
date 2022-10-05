import React, { useContext, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'
import { AppContext } from '../App'

const auth = getAuth()

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setRoute, setUser } = useContext(AppContext)

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
        console.log(user)
        toast(`Usuario ${email} registrado correctamente`)
        setUser(user)
        setRoute('home')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(`Codigo de error: ${errorCode}, ${errorMessage}`)
        // ..
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createUser()
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-xl font-semibold text-center text-yellow-600'>
        Register to start shopping
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col max-w-sm gap-2'>
        <input
          type='email'
          className='px-2 py-1 border border-gray-900 rounded outline-none'
          value={email}
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='px-2 py-1 border border-gray-900 rounded outline-none'
          value={password}
          placeholder='contraseña'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='px-4 py-2 font-semibold text-white transition rounded-full bg-sky-400 hover:bg-cyan-700'>
          Sign up
        </button>
      </form>
    </div>
  )
}

export default Register
