import React from 'react';
import './home.css'
import Banner from '../../componenents/home/Banner';
import Books from '../../componenents/home/Books';

function Home() {
  return (
    <div className='home'>
      <Banner/>
      <Books />
    </div>
  )
}

export default Home