import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/public/login";
import Signup from "./components/public/signup";
import Terms from "./components/public/terms";
import Booking from "./components/private/booking";
import JoinEvent from './components/private/JoinEvent';
import Ticket from './components/private/tickets';
import HomePage from './components/public/Homepage';
import AdminDashboard from './components/private/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/join" element={<JoinEvent />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/admin" element={<AdminDashboard />} />
      
      </Routes>
    </Router>
  );
}

export default App;


