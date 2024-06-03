import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function UserProfile() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastname: "",
    description: "",
  });
  const { id } = useParams(); // Get the user's id from the URL parameter

  const getTasks = async () => {
    try {
      const results = await fetch(`/api/tasks/${id}`, {
        // Interpolate id directly into the URL
        method: "GET",
      });

      if (!results.ok) {
        throw new Error(`HTTP error! Status: ${results.status}`);
      }

      const data = await results.json();
      setTasks(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUser = async () => {
    try {
      const results = await fetch(`/api/users/${id}`);
      const data = await results.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
    getUser();
  }, [id]); // Fetch tasks and user when id changes

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-4">
          {/* User information */}
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
              alt="User Photo"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.lastname}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-700">{user.description}</p>
          </div>

          {/* User's tasks */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-900">Tasks</h4>
            <ul className="mt-4">
              {tasks.map((task) => (
                <li key={task.id} className="text-sm text-gray-700">
                  {task.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
