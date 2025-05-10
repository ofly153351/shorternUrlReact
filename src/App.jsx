import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { colors } from '@mui/material';
import Shorturl from './Components/Shorturl';


function App() {


  return (
    <div className="App min-h-screen bg-gray-100">
      <Navbar />
      <Shorturl />
    </div>
  );
}

export default App;
