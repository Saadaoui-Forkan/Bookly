import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const notify = () => toast("Wow so easy!");
  return (
    <div>
      <ToastContainer theme="colored" />
      <button onClick={notify}>Notify!</button>
    </div>
  )
}

export default App