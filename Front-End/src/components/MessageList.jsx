import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShareMessage from "./ShareMessage";
import { FiLock, FiMessageCircle, FiAlertCircle } from "react-icons/fi";

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 text-center">
        <div className="premium-card w-full max-w-md p-8 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <FiLock className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-red-500 mb-3">Access Denied</h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">You are not authorized to view these messages. Please use the correct link or authentication key.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="premium-btn premium-btn-outline w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mr-3">
            <FiMessageCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="premium-title text-2xl md:text-3xl">Your Secret Messages</h2>
        </div>
        
        {error && (
          <div className="flex items-center bg-red-50 text-red-500 p-4 rounded-lg mb-4 animate-fade-in">
            <FiAlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm md:text-base">{error}</p>
          </div>
        )}
        
        <div className="premium-card p-6 mb-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="loading-spinner mb-4"></div>
              <p className="text-gray-500">Loading your messages...</p>
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={msg._id} 
                  className={`message-bubble animate-slide-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-grow text-left text-sm md:text-base pr-4 text-gray-800 font-medium">
                      {msg.content}
                    </div>
                    <ShareMessage messageId={msg._id} content={msg.content} />
                  </div>
                  <div className="mt-2 text-xs text-gray-400 flex justify-between items-center">
                    <span>
                      {new Date(msg.createdAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <FiMessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-2">No messages yet</p>
              <p className="text-sm text-gray-400">Share your link to receive secret messages</p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="premium-btn premium-btn-outline"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
