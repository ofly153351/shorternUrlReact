import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { colors } from '@mui/material';
import Shorturl from './Components/Shorturl';
import Reports from './Components/Reports';


function App() {


  return (
    <div className="App min-h-screen bg-gray-100">
      <Navbar />
      <div className=' bg-gray-100'>
        <Shorturl />
        <Reports />
      </div>
    </div>
  );
}

export default App;
