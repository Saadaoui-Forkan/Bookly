import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './componenents/header/Header';
import Home from './pages/home/Home';
import Login from './pages/form/Login';
import Footer from './componenents/footer/Footer';
import Register from './pages/form/Register';
import { useSelector } from 'react-redux';
import BookDetails from './pages/book/BookDetails';

function App() {
  const { user } = useSelector(state => state.auth)
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />}/>
        <Route path='/:book' element={user ? <BookDetails/> : <Navigate to="/"/>}/>
      </Routes>
      <Footer/>
      <ToastContainer theme="light" />
    </BrowserRouter>
  )
}

export default App