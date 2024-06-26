import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BoardList = ({ board }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetches the list of boards, based on who is using the app

  const fetchBoards = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/boards`, {
        credentials: "include",
      });
      const data = await response.json();
      setBoards(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setLoading(false);
    }
  };

  //delete the board based on unique id

  const handleDelete = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/board`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    console.log(data);
    fetchBoards();
  };

  useEffect(() => {
    fetchBoards();
  }, [board]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6 w-full">
    <h1 className="text-2xl md:text-4xl font-semibold font-sans text-center mb-4 md:mb-6">Your Boards</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {boards.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">No boards to show</p>
      ) : (
        boards.map((board) => (
          <Link
            to={`/boards/${board._id}`}
            key={board._id}
            className="relative block bg-white shadow-md rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-2">{board.title}</h2>
            <p className="text-gray-500 text-xs md:text-sm mb-4">{new Date(board.createdAt).toLocaleString()}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(board._id);
              }}
              className="absolute top-2 md:top-4 right-2 md:right-4 p-2 bg-red-500 hover:bg-red-600 text-white text-xs md:text-sm rounded-lg shadow-lg transition-colors"
            >
              Delete
            </button>
          </Link>
        ))
      )}
    </div>
  </div>
  );
};

export default BoardList;
