import { onMessage } from 'firebase/messaging'
import React, { createContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Header from './components/Header'
import { app, messaging } from './firebase'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Register from './Routes/Register'
import Shop from './Routes/Shop'

export const AppContext = createContext(null)

onMessage(messaging, (payload) => {
  console.log('Nueva notificacion ', payload)
  toast.custom((t) => (
    <div className='px-8 py-4 bg-indigo-700 rounded-full shadow-lg'>
      <h1 className='text-lg font-semibold text-white'>
        {payload.notification.title}
      </h1>
      <p className='text-sm text-white'>{payload.notification.body}</p>
    </div>
  ))
})

function App() {
  const [route, setRoute] = useState('home')
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ route, setRoute, user, setUser }}>
      <div className='w-screen h-screen'>
        <Toaster />
        <Header />
        <main className='px-6 pt-24 pb-20'>
          {route === 'home' && <Home />}
          {route === 'login' && <Login />}
          {route === 'register' && <Register />}
          {route === 'shop' && <Shop />}
          {user && <p>Usuario: {user.uid}</p>}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App
