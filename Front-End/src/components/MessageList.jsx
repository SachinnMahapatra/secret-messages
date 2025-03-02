import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MessageList = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    // Dummy messages (later we will fetch from backend)
    { id: 1, text: "You are amazing!" },
    { id: 2, text: "Keep up the great work!" },
  ]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("authKey");
    const requiredKey = `auth-${id}`;
    if (storedKey === requiredKey) {
      setIsAuthorized(true);
    }
  }, [id]);

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-600">You are not authorized to view these messages.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Secret Messages</h2>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="p-3 border-b text-gray-700">
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default MessageList;
