import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateLink = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState(null);
  const navigate = useNavigate();

  const handleCreateLink = () => {
    if (!name.trim()) return;
    const uniqueId = uuidv4();
    const generatedLink = `${window.location.origin}/secret/${uniqueId}?name=${encodeURIComponent(name)}`;
    setLink(generatedLink);
    localStorage.setItem("authKey", `auth-${uniqueId}`); // Store unique auth key
    localStorage.setItem("userId", uniqueId); // Store user ID
  };

  const handleViewMessages = () => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      navigate(`/messages/${storedUserId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Secret Message Link</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="w-full max-w-md px-4 py-2 border rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition mb-4"
        onClick={handleCreateLink}
      >
        Generate Link
      </button>
      {link && (
        <div className="mt-4 p-3 bg-white shadow rounded-lg w-full max-w-md">
          <p className="text-gray-700">Share this link to receive secret messages:</p>
          <input
            type="text"
            readOnly
            value={link}
            className="w-full mt-2 p-2 border rounded text-gray-600"
          />
        </div>
      )}
      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition mt-4"
        onClick={handleViewMessages}
      >
        View My Messages
      </button>
    </div>
  );
};

export default CreateLink;
