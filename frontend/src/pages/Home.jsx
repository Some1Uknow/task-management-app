import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div className="text-white h-screen bg-gradient-to-tr from-slate-900 to-zinc-700">
      <NavBar />
      <div className="px-8 md:px-16 py-16 md:py-32 flex flex-col md:flex-row items-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl w-full md:w-2/3 font-bold mb-4 md:mb-0">
          The place <br className="hidden md:block" />
          to keep <br className="hidden md:block" />
          all your tasks
        </h1>
        <p className="w-full md:w-1/2 text-2xl md:text-4xl lg:text-6xl mt-4 md:mt-0">
          Store all your tasks with ease without any hassle
        </p>
      </div>
      <p className="text-xl md:text-3xl lg:text-4xl text-center mt-8 md:mt-16">
        Get Started with Taskflow Today itself!
      </p>
    </div>
  );
};

export default Home;
