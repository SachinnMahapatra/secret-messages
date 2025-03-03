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
      <div >
        <div >
          
            <script type="text/javascript">
              atOptions ={" "}
              {`
		'key' : '19a5aac66eca7386fdc01441d5f1c039',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	`}
              ;
            </script>
            <script
              type="text/javascript"
              src="//www.highperformanceformat.com/19a5aac66eca7386fdc01441d5f1c039/invoke.js"
            ></script>
           
          
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl text-center py-8">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to Secret Message
        </h1>
        <p className="text-lg mb-8 max-w-md drop-shadow-md">
          Create your unique secret message link and share it anonymously with
          friends!
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
        <script type="text/javascript">
              atOptions ={" "}
              {`
		'key' : '19a5aac66eca7386fdc01441d5f1c039',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	`}
              ;
            </script>
            <script
              type="text/javascript"
              src="//www.highperformanceformat.com/19a5aac66eca7386fdc01441d5f1c039/invoke.js"
            ></script>
      </footer>
      <script type='text/javascript' src='//pl26015944.effectiveratecpm.com/2f/d2/6d/2fd26ddd6ce90cbf201ac3837d5395b7.js'></script>
    </div>
  );
};

export default Home;
