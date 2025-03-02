import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 text-center">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Secret Message</h1>
      <p className="text-lg mb-6 max-w-md drop-shadow-md">
        Create your unique secret message link and share it anonymously with friends!
      </p>
      <button
        className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
        onClick={() => navigate("/create-link")}
      >
        Create Your Link
      </button>
    </div>
  );
};

export default Home;