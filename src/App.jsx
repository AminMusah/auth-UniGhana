import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Dashboard from './pages/Dashboard'

function App() {
  let {isAuth} = useContext(UserContext)

  return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ isAuth ? <Dashboard /> : <Login/>} />
      </Routes>
  )
}

export default App
