import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div className="text-white h-screen bg-gradient-to-tr from-slate-900 to-zinc-700">
      <NavBar />
      <div className="px-16 py-32 flex flex-row items-center">
        <h1 className="text-8xl w-2/3 font-bold mb-4">
          The place <br />
          to keep <br />
          all your tasks
        </h1>
        <p className="w-1/2 text-6xl">
          Store all your tasks with ease without any hassle
        </p>
      </div>
      <p className="text-4xl text-center">
        Get Started with Taskflow Today itself!
      </p>
    </div>
  );
};

export default Home;
