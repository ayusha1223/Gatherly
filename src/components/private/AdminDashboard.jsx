import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/admindashboard.css"; 
import { useNavigate } from "react-router-dom"; // Assuming React Router is used

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate(); // For logout navigation

    // Fetch events data from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("/api/events");
                setEvents(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Logout function
    const handleLogout = () => {
        // Perform logout logic (e.g., clearing auth tokens)
        localStorage.removeItem("token"); // Assuming you store auth token
        navigate("/login"); // Redirect to login page
    };

    // Validate remarks
    const validateRemarks = (remarks) => {
        const errors = {};
        if (!remarks || remarks.trim() === '') {
            errors.required = "Remarks cannot be empty";
        } else if (remarks.trim().length < 5) {
            errors.length = "Remarks must be at least 5 characters long";
        }
        return errors;
    };

    // Function to update remarks
    const updateRemarks = async (id, newRemarks) => {
        const errors = validateRemarks(newRemarks);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(prev => ({ ...prev, [id]: errors }));
            return;
        }

        try {
            await axios.put(`/api/events/${id}`, { remarks: newRemarks });

            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === id ? { ...event, remarks: newRemarks } : event
                )
            );

            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
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
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.eventName}</td>
                                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                                <td>{event.numberOfGuests}</td>
                                <td>{event.eventType}</td>
                                <td>{event.contactEmail}</td>
                                <td>{event.fullName}</td>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={event.remarks || ""}
                                        onBlur={(e) => updateRemarks(event.id, e.target.value)}
                                    />
                                    {validationErrors[event.id] && (
                                        <div className="validation-error">
                                            {Object.values(validationErrors[event.id]).map((error, index) => (
                                                <p key={index}>{error}</p>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => {
                                        const input = document.querySelector(`input[value='${event.remarks || ""}']`);
                                        if (input) updateRemarks(event.id, input.value);
                                    }}>
                                        Save
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

