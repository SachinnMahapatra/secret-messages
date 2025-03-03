import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MessageList = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedKey = localStorage.getItem("authKey");
    const requiredKey = `auth-${id}`;
    if (storedKey === requiredKey) {
      setIsAuthorized(true);
      fetchMessages();
    }
  }, [id]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}/messages`); // ✅ Correct API URL
      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      } else {
        setError(data.error || "Failed to fetch messages");
      }
    } catch (err) {
      setError("An error occurred while fetching messages");
    }
  };

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
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="p-3 border-b text-gray-700">
              {msg.content} {/* Backend se 'content' aa raha hai */}
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
