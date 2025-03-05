import axios from 'axios';
import { saveToken, removeToken } from '../utils/auth'; // Import removeToken

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Signup
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        if (response.data.token) {
            saveToken(response.data.token); // Save the token to localStorage
        }
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error.response || error);
        throw error;
    }
};

// Login
export const login = async (userData) => {
    try {
        console.log('Sending login request with:', userData); // Log the payload
        const response = await axios.post(`${API_URL}/login`, userData);
        if (response.data.token) {
            saveToken(response.data.token); // Save the token to localStorage
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response || error);
        throw error;
    }
};

// Logout
export const logout = () => {
    removeToken(); // Remove the token from localStorage
};