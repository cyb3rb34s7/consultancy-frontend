// AuthService.js
import axios from "axios";

const BASE_URL = "http://164.52.203.34:8000/api/v1";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login/`, {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const register = async (
  firstName,
  lastName,
  password,
  confirmPassword,
  phoneNumber,
  email
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register/`, {
      first_name: firstName,
      last_name: lastName,
      password: password,
      confirm_password: confirmPassword,
      phone_number: phoneNumber,
      email: email,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const verifyEmail = async (email, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-email/`, {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Email verification failed"
    );
  }
};
