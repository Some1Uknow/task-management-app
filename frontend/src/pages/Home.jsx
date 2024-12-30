import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div className="text-white h-screen bg-gradient-to-tr from-slate-900 to-zinc-700">
      <NavBar />
      <div className="px-8 md:px-16 py-16 md:py-32 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            The place to keep all your tasks
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-zinc-300">
            Store all your tasks with ease without any hassle. Taskflow simplifies your workflow and keeps you organized.
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-slate-900 text-lg font-semibold rounded-lg hover:bg-opacity-90 transition duration-300">
            Get Started
          </button>
        </div>
        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <div className="bg-zinc-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Taskflow?</h2>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex items-center">
                <span className="mr-2">✔️</span> Simple and intuitive interface
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> Access tasks from anywhere
              </li>
              <li className="flex items-center">
                <span className="mr-2">✔️</span> Collaborate with your team
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-xl md:text-2xl lg:text-3xl text-center mt-16 md:mt-24 text-zinc-300">
        Join thousands of users who trust Taskflow to manage their tasks.
      </p>
    </div>
  );
};

export default Home;
