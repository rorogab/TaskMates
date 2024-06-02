import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    lastname: "",

    description: "",
  });
  const { id } = useParams(); // Get the user's id from the URL parameter

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
    getUser();
  }, []);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <h3>{user.name}</h3>
      <div>
        <img
          className="w-full"
          href="../assets/favicons/appartment.png"
          alt="Appartment"
        />
      </div>
      <div className="px-6 py-4">
        <label>Name:</label> {user.name}
      </div>
      <div className="font-bold text-xl mb-2">
        <label>Last Name:</label> {user.lastname}
      </div>
      <p>
        <label>Description:</label>
        {user.description}
      </p>
      <div>
        <Link to={`/users/${id}/tasks`}>Go to tasks</Link>
      </div>
    </div>
  );
}

export default UserProfile;
