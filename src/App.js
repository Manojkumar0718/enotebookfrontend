import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import UpdateNote from './Pages/UpdateNote'
import AddNote from './Pages/AddNote'
import NoPage from './Pages/NoPage'
import Profile from './Pages/Profile'
import MyState from './Context/Data/MyState'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <MyState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/addnote' element={<AddNote />} />
          <Route path='/notes/edit/:id' element={<UpdateNote />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/*' element={<NoPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </MyState>
  )
}

export default App
