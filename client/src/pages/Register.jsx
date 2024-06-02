import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ onRegisterSuccess }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  // Define state variables to store user registration data
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    adress: "",
    description: "",
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = async () => {
    try {
      const { data } = await axios.post("/api/users/register", formData);

      localStorage.setItem("token", data.token);
      //save user id. data.userid
      console.log(data.message, data.token);

      // Call the onLoginSuccess function to handle login success
      onRegisterSuccess(email);

      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.log(error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    // If there are validation errors, update the state and don't submit the form
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If there are no errors, proceed with registration
    register();
  };

  return (
    <div className="container">
      <div className="w-full max-w-xs">
        <h2 className="block text-gray-700 text-lg font-bold mb-2 text-center">
          Register form
        </h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {formErrors.email && <div>{formErrors.email}</div>}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Lastname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="adress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Adress
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="adress"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
          >
            Register
          </button>
          <div className="flex mt-5 space-x-4">
            <div className="block text-gray-700 text-sm font-bold mb-2">
              Already have an account?
            </div>
            <a
              className="inline-block align-baseline font-bold text-sm text-sky-600 hover:text-sky-700"
              href="/login"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
