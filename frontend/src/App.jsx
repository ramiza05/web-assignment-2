import { useState } from 'react'
import { useSelector, useDispatch} from "react-redux"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./navbar";
import Register from './register'
import Home from './home';
import Login from "./login"
import Events from "./events"
import ProtectedEventRoute from "./protectedEventRoute";

import './App.css'

function App() {
  

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Events" element={<ProtectedEventRoute><Events/></ProtectedEventRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
