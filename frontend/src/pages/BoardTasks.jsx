import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BoardTasks = () => {
  const params = useParams();
  const boardId = params.id;
  const [boardtitle, setboardtitle] = useState("");
  const fetchBoard = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/board/${boardId}`
    );
    const data = await response.json();
    setboardtitle(data.title);
  };

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchBoardTasks = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/board/${boardId}/tasks`
    );
    const data = await response.json();
    setTasks(data);
  };

  const handleCreateTask = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, boardId }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const handleDeleteTask = async (taskId) => {
    await fetch(`${import.meta.env.VITE_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  useEffect(() => {
    fetchBoard();
    fetchBoardTasks();
  }, []);

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <Link className="p-2 bg-gray-300 rounded-md hover:shadow-md" to="/dashboard">Go Back to Boards</Link>
      <h1 className="text-6xl font-semibold mb-6 text-center font-sans">
        {boardtitle}
      </h1>
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center">
        <input
          type="text"
          className="border rounded p-2 mr-2 mb-4 sm:mb-0 w-full sm:w-auto shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border rounded p-2 mr-2 mb-4 sm:mb-0 w-full sm:w-auto shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600 transition duration-200"
          onClick={handleCreateTask}
        >
          Create Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center p-4 mb-4 bg-white rounded shadow-md hover:shadow-lg transition duration-200"
          >
            <div>
              <h2 className="text-xl font-semibold mb-1">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded shadow-md hover:bg-red-600 transition duration-200"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardTasks;
