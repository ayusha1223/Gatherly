import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch all bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>All Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Number of Guests</th>
            <th>Event Type</th>
            <th>Contact Email</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.eventName}</td>
              <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
              <td>{booking.numberOfGuests}</td>
              <td>{booking.eventType}</td>
              <td>{booking.contactEmail}</td>
              <td>{booking.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;