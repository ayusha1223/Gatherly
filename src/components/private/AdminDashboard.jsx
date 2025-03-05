import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/admindashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    // Fetch all bookings from the backend
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/bookings");
                setBookings(response.data.bookings);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear auth token
        navigate("/login"); // Redirect to login page
    };

    // Validate remarks
    const validateRemarks = (remarks) => {
        const errors = {};
        if (!remarks || remarks.trim() === "") {
            errors.required = "Remarks cannot be empty";
        } else if (remarks.trim().length < 3) {
            errors.length = "Remarks must be at least 3 characters long";
        }
        return errors;
    };

    // Update remarks for a booking
    const updateRemarks = async (id, newRemarks) => {
        const errors = validateRemarks(newRemarks);
        if (Object.keys(errors).length > 0) {
            setValidationErrors((prev) => ({ ...prev, [id]: errors }));
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/bookings/${id}/remarks`, {
                remarks: newRemarks,
            });

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === id ? { ...booking, remarks: newRemarks } : booking
                )
            );

            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });

            toast.success("Remarks updated successfully!");
        } catch (err) {
            console.error("Error updating remarks:", err);
            toast.error("Error updating remarks. Please try again.");
        }
    };

    // Delete a booking
    const deleteBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/bookings/${id}`);
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.id !== id)
            );
            toast.success("Booking deleted successfully!");
        } catch (err) {
            console.error("Error deleting booking:", err);
            toast.error("Error deleting booking. Please try again.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            <ToastContainer />
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Date</th>
                            <th>Number of Guests</th>
                            <th>Event Type</th>
                            <th>Contact Email</th>
                            <th>Full Name</th>
                            <th>Remarks</th>
                            <th>Actions</th>
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
                                <td>{booking.fullName}</td>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={booking.remarks || ""}
                                        onBlur={(e) => updateRemarks(booking.id, e.target.value)}
                                    />
                                    {validationErrors[booking.id] && (
                                        <div className="validation-error">
                                            {Object.values(validationErrors[booking.id]).map((error, index) => (
                                                <p key={index}>{error}</p>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="save-btn"
                                        onClick={() => {
                                            const input = document.querySelector(
                                                `input[value='${booking.remarks || ""}']`
                                            );
                                            if (input) updateRemarks(booking.id, input.value);
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteBooking(booking.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;