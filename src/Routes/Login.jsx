import React, { useContext, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { AppContext } from '../App'
import toast from 'react-hot-toast'

const provider = new GoogleAuthProvider()
const auth = getAuth()

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setRoute, setUser } = useContext(AppContext)

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        // ...
        setUser(user)
        toast('Logged In')
        setRoute('home')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }
  const emailLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
        setUser(user)
        toast('Inicio de sesion valido')
        setRoute('home')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-xl font-semibold text-sky-700'>Login Page</h1>
      <p>Sign in to get access to your account</p>
      <div className='flex flex-col gap-4 py-4'>
        <button
          onClick={googleLogin}
          className='flex px-4 py-2 font-medium text-black transition bg-white border border-black rounded-full hover:bg-gray-100'>
          <FcGoogle className='text-2xl' />
          <span className='pl-2'>Sign in with Google</span>
        </button>
        <p className='text-center'>or</p>
        <form onSubmit={emailLogin} className='flex flex-col gap-4'>
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
          <button className='px-4 py-2 font-semibold text-white transition rounded-full bg-sky-500 hover:bg-sky-600'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
