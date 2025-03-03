import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [generatedId, setGeneratedId] = useState(null);

  useEffect(() => {
    // ✅ Find if any generated link exists in localStorage
    const keys = Object.values(localStorage);
    const generatedKey = keys.find((key) => key.startsWith(""));

    if (generatedKey) {
      const extractedId = generatedKey.replace("generated-", ""); // Extract the ID
      setGeneratedId(extractedId);
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200">
      <div className="w-full bg-white/10 backdrop-blur-sm p-4 mb-6 rounded-lg mt-4">
        <div className="h-16 flex items-center justify-center border-2 border-dashed border-white/30 rounded-md">
          <p className="text-white/70">Ad Space (Top Banner)</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl text-center py-8">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to Secret Message
        </h1>
        <p className="text-lg mb-8 max-w-md drop-shadow-md">
          Create your unique secret message link and share it anonymously with friends!
        </p>
        <button
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 mb-4"
          onClick={() => navigate("/create-link")}
        >
          Create Your Link
        </button>

        {/* ✅ "View Messages" button only appears if a generated link exists */}
        {generatedId && (
          <button
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => navigate(`/messages/${generatedId}`)}
          >
            View Messages
          </button>
        )}
      </div>

      <footer className="w-full py-4 text-center text-black/70 text-sm">
        <p>© 2025 MystMessage . All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
