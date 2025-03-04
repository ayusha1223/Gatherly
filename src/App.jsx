import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/public/login";
import Signup from "./components/public/signup";
import "./styles/login.css";
import "./styles/signup.css";
import Terms from "./components/public/terms";
import "./styles/terms.css";
import Booking from "./components/private/booking";
import "./styles/booking.css";
import JoinEvent from './components/private/JoinEvent';
import "./styles/joinevent.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/join" element={<JoinEvent />} />
      
      </Routes>
    </Router>
  );
}

export default App;


