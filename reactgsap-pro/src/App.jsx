import React from 'react';
import Navbar from './components/Nav';
import Nav from './components/Nav';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className='w-full h-screen text-white'>
      <Nav />
      <LandingPage />
    </div>
  )
}

export default App
