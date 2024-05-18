import { useContext, useEffect, useState } from "react";
import { MdComputer, MdTask } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserContext } from "../Provider";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const fetchUserProfile = async () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUser(userInfo);
      });
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  function logOut() {
    fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUser(null);
  }

  const username = user?.username;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between py-2 px-6 md:px-20 bg-gradient-to-r from-slate-800 to-zinc-700">
        <p className="flex flex-row items-center text-4xl md:text-6xl font-bold text-white font-Chakra">
          <MdTask className="mr-2 text-5xl md:text-7xl" />
          TaskFlow
        </p>
        {username ? (
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <button className="text-white font-normal text-lg">
              <Link to="/dashboard">Dashboard</Link>
            </button>
            <button
              className="bg-black p-2 md:p-3 rounded-lg text-white font-normal text-lg"
              onClick={() => logOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <button className="text-white font-normal text-lg">
              <Link to="/login">Login</Link>
            </button>
            <Link to="/register">
              <button className="bg-white p-2 md:p-3 rounded-lg text-black font-normal text-lg">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
