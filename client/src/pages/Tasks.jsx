import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Tasks({ selectedUserId, handleUserSelect }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [users, setUsers] = useState([]);

  const getTasks = async () => {
    try {
      const results = await fetch(`/api/tasks`, {
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

  const getUsers = async () => {
    try {
      const results = await fetch(`/api/users`);
      const data = await results.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [selectedUserId]);

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      getTasks();
    } catch (error) {
      console.error(error.message);
    }
  };

  const addTask = async () => {
    try {
      const newTask = {
        description: input,
        user_id: selectedUserId,
        category: category,
      };

      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      getTasks();
      setInput(""); // Clear the input field
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="antialiased bg-white text-slate-700 mx-2">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-3xl text-yellow-500 font-medium">Tasks List</h1>
        <p className="text-slate-500">Hello, here are your shared tasks</p>

        <form onSubmit={handleSubmit} className="my-5">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-medium">
                Task
              </label>
              <input
                id="description"
                onChange={handleChange}
                value={input}
                className="p-2 border border-slate-200 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="p-2 border border-slate-200 rounded-md"
              >
                <option value="category">Category</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Buying">Buying</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="user" className="text-sm font-medium">
                Asign task
              </label>
              <select
                id="user"
                placeholder="Select user"
                onChange={(event) => handleUserSelect(event.target.value)}
                className="p-2 border border-slate-200 rounded-md"
              >
                <option value="">Select user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="p-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md"
            >
              Add Task
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {tasks.map((task) => {
            const userAssociatedWithTask = users.find(
              (user) => user.id === task.user_id
            );
            return (
              <div
                key={task.id}
                className="p-4 bg-white border border-slate-200 rounded-md shadow-sm hover:bg-slate-100 transition ease-linear duration-150"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <Link
                      to={`/users/${task.user_id}`}
                      className="font-medium hover:underline"
                    >
                      {userAssociatedWithTask
                        ? userAssociatedWithTask.name
                        : "User Not Found"}
                    </Link>
                    <p className="text-slate-500">{task.description}</p>
                    <p className="text-slate-500">{task.category}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 bg-red-700 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
