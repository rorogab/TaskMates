import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState(false);
  const { email, password } = credentials;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios.post("/api/users/login", credentials, {
        headers: {
          "Content-Type": "application/json",
          // Include the Authorization header with the token
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);

      onLoginSuccess(email);
      navigate("/tasks");
      console.log("Request sent successfully");
    } catch (error) {
      console.log(error);
      console.log("This is the error");
      // Set passwordError to true when login fails
      setPasswordError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset passwordError on each submit attempt
    setPasswordError(false);

    // Check if password is empty
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }
    login();
  };

  return (
    <div className="container">
      <div className="w-full max-w-xs">
        <h2 className="block text-gray-700 text-lg font-bold mb-2 text-center">
          Welcome
        </h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="e-mail"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border ${
                passwordError ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">
                Please enter a valid password.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-sky-600 hover:text-sky-700"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        {/* <p class="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p> */}
      </div>
    </div>
  );
}

export default Login;
