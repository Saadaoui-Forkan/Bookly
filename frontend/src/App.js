import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './componenents/header/Header';
import Home from './pages/home/Home';
import Login from './pages/form/Login';
import Footer from './componenents/footer/Footer';
import Register from './pages/form/Register';

function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <Footer/>
      <ToastContainer theme="colored" />
    </BrowserRouter>
  )
}

export default App