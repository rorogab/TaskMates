import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Tasks from "./pages/Tasks";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import Bills from "./pages/Bills";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //When clicking Log In, it logs you in and navigates you to the tasks page.
  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    navigate("/tasks");
  };

  //When the registration is completed, it navigates you to the login page.
  const handleRegisterSuccess = (email) => {
    navigate("/login");
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId); //update selected userId
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); //Se the isLoggedIn to false.
    navigate("/home"); //Once logged out, take the user to the home page
  };

  return (
    <div className="">
      <div className="">
        <nav className="flex justify-between items-center gap-2.5 px-10 py-4">
          <h1 className="text-2xl font-semibold text-sky-700">
            <Link to="/home">Task Mates</Link>
          </h1>
          <div className="flex space-x-4">
            {isLoggedIn && (
              <>
                <div className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 text-sm rounded">
                  <Link to="/tasks">Tasks</Link>
                </div>
                <div className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 text-sm rounded">
                  <Link to="/Bills">Bills</Link>
                </div>
              </>
            )}
            {isLoggedIn ? (
              // Render logout button when logged in
              <button
                className="bg-transparent hover:bg-sky-700 text-sky-600 font-semibold hover:text-white py-2 px-4 text-sm border border-blue-600 hover:border-transparent rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              // Render login and register buttons when not logged in
              <>
                <div className="bg-transparent hover:bg-sky-700 text-sky-600 font-semibold hover:text-white py-2 px-4 text-sm border border-blue-600 hover:border-transparent rounded">
                  <Link to="/register">Register</Link>
                </div>
                <div className="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-4 text-sm rounded">
                  <Link to="/login">Login</Link>
                </div>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />

          <Route
            path="/tasks"
            element={
              isLoggedIn ? (
                <Tasks
                  selectedUserId={selectedUserId}
                  handleUserSelect={handleUserSelect}
                  users={users}
                />
              ) : null // Remove the Navigate component, it's redundant. Instead just use null
            }
          />
          <Route
            path="/users/:id"
            element={
              isLoggedIn ? (
                <UserProfile selectedUserId={selectedUserId} />
              ) : (
                <Navigate to="/users/:id" />
              )
            }
          >
            <Route
              path="/users/:id/tasks"
              element={
                <Tasks
                  selectedUserId={selectedUserId}
                  handleUserSelect={handleUserSelect}
                  users={users}
                />
              }
            />
          </Route>
          <Route
            path="/bills"
            element={
              isLoggedIn ? <Bills users={users} /> : <Navigate to="/bills" />
            }
          />
          {/* <Route path="*" element={<404 />} />*/}
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={<Register onRegisterSuccess={handleRegisterSuccess} />}
          />
        </Routes>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
