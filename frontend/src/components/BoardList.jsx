import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BoardList = ({ board }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-center mb-6">Your Boards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boards.length === 0 ? (
  <p className="text-center text-gray-500">No boards to show</p>
) : (
  boards.map((board) => (
    <Link
      to={`/boards/${board._id}`}
      key={board._id}
      className="block bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-semibold">{board.title}</h2>
      <p>{new Date(board.createdAt).toLocaleString()}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleDelete(board._id);
        }}
        className="p-2 mt-2 bg-red-500 hover:bg-red-600 text-sm text-white rounded-lg shadow-lg"
      >
        Delete Board
      </button>
    </Link>
  ))
)}

      </div>
    </div>
  );
};

export default BoardList;
