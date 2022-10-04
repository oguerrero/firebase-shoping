import React, { createContext, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import { app } from './firebase'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Register from './Routes/Register'

export const AppContext = createContext(null)

function App() {

  const [route, setRoute] = useState('home')
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ route, setRoute, user, setUser }}>
      <Toaster />
      <Header />
      <main className='p-6'>
        {route === 'home' && <Home />}
        {route === 'login' && <Login />}
        {route === 'register' && <Register />}
        {user && <p>Usuario: {user.uid}</p>}
      </main>
    </AppContext.Provider>
  )
}

export default App
