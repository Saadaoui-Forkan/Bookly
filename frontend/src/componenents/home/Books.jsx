import React from 'react'
import img from '../../images/logo.png'

function Books() {
  return (
    <div className='books'>
        <h1 className='books-title'>Explore Books</h1>
        <div className="books-container">
            <div className="books-card">
                <img src={img} className='books-card-img' alt=''/>
                <div className="over">
                    <h2 className="over-title">Title</h2>
                    <h3 className="over-auth">Author</h3>
                    <button className="over-btn">SHOW BOOK</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Books