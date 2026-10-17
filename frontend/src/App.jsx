import { useState } from 'react'
import { useSelector, useDispatch} from "react-redux"
import { setEmail, setName, setPassword, resetPassword } from './userSlice';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./navbar";
import Register from './register'
import Home from './home';

import './App.css'

function App() {
  

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Register" element={<Register/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
