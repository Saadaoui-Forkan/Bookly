import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/apiCalls/authApiCalls'

function Dropdown() {
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
    }
  return (
    <div className='dropdown'>
        <ul className="dropdown-menu">
            <li className="dropdown-item" onClick={logout}>
                Logout
            </li>
            <li className="dropdown-item">
                My Favorites
            </li>
        </ul>
    </div>
  )
}

export default Dropdown