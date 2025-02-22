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
import Booking from "./components/public/booking";
import "./styles/booking.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;


