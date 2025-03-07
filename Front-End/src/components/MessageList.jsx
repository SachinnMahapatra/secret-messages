import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShareMessage from "./ShareMessage";

const MessageList = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedKey = localStorage.getItem("authKey");
    const requiredKey = `auth-${id}`;
    if (storedKey === requiredKey) {
      setIsAuthorized(true);
      fetchMessages();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://mystmessage.onrender.com/api/user/${id}/messages`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      } else {
        setError(data.error || "Failed to fetch messages");
      }
    } catch (err) {
      setError("An error occurred while fetching messages");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <h2 className="text-xl md:text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-sm md:text-base text-gray-600">You are not authorized to view these messages.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Your Secret Messages</h2>
      {error && <p className="text-red-500 text-sm md:text-base mb-2">{error}</p>}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-3 md:p-4">
        {isLoading ? (
          <div className="flex flex-col md:flex-row justify-center items-center py-6 md:py-8">
            <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-indigo-600"></div>
            <span className="mt-2 md:mt-0 md:ml-3 text-sm md:text-base text-gray-600">Loading messages...</span>
          </div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div 
              key={msg._id} 
              className="p-2 md:p-3 border-b text-gray-700 flex justify-between items-center break-words"
            >
              <div className="flex-grow text-left text-sm md:text-base pr-2">{msg.content}</div>
              <ShareMessage messageId={msg._id} content={msg.content} />
            </div>
          ))
        ) : (
          <p className="text-sm md:text-base text-gray-500 py-4">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default MessageList;
