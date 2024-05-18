import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Provider";
import { useContext } from "react";
import { MdTask } from "react-icons/md";
import BoardList from "../components/BoardList";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [board, setboard] = useState("");

  //fetching user profile to show details on dashboard

  const fetchUserProfile = async () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUser(userInfo);
      });
    });
  };

  //create a new board by sending data to the backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/board`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board }),
    });
    const data = await res.json();
    setboard("");
    console.log(data);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <div className="flex flex-row w-screen">
        {" "}
        <div className="flex flex-col h-max w-max m-2 justify-center items-center">
          <div className="border-l-2 w-max h-max p-2 bg-gray-200 rounded-lg shadow-md flex flex-col gap-4 items-start">
            <div>
              <Link
                className="font-sans text-4xl font-bold flex flex-row items-center"
                to="/"
              >
                <MdTask /> TaskFlow
              </Link>
            </div>
            <div>
              <p className="font-sans text-2xl font-semibold flex flex-row items-center">
                {user?.username}'s Dashboard
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full mt-4 rounded-lg p-2 gap-2 border-2 bg-gray-200 shadow-md"
          >
            <input
              placeholder="Enter Board Name"
              className="w-max p-2 rounded-lg text-sm"
              onChange={(e) => setboard(e.target.value)}
              value={board}
            />
            <button
              type="submit"
              className="p-1 bg-green-500 hover:bg-green-600 text-sm text-white rounded-lg"
            >
              Create New Board
            </button>
          </form>
        </div>
        <BoardList board={board} />
      </div>
    </>
  );
};

export default Dashboard;
