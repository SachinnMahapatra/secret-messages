import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const SecretMessage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Backend call to store message (To be implemented later)
    setIsSent(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      {isSent ? (
        <h2 className="text-2xl font-bold text-green-600">Message Sent Successfully!</h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Send a Secret Message to {name || "User"}
          </h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your secret message..."
            className="w-full max-w-md px-4 py-2 border rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </>
      )}
    </div>
  );
};

export default SecretMessage;
