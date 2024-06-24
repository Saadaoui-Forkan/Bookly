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
import Favorites from './pages/favorites/Favorites';
import NotFound from './pages/not-found/NotFound';
import AdminDashboard from './pages/dashboard/AdminDashboard';

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
        <Route path='/favorites' element={user ? <Favorites/> : <Navigate to="/"/>}/>
        <Route path="admin">
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard/> : <Navigate to="/" />}
          />
          {/* <Route
            path="books"
            element={user?.isAdmin ? <BooksDashboard /> : <Navigate to="/" />}
          /> */}
          </Route>
        <Route path="/*" element={<NotFound/>} />
      </Routes>
      <Footer/>
      <ToastContainer theme="light" />
    </BrowserRouter>
  )
}

export default App