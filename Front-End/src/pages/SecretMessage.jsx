import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const SecretMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [hasGeneratedLink, setHasGeneratedLink] = useState(false);

  // Check if the user is the owner
  useEffect(() => {
    const storedKey = localStorage.getItem("authKey");
    const requiredKey = `auth-${id}`;
    
    // Check if user has already generated the link
    const generated = localStorage.getItem(`generated-${id}`);
    setHasGeneratedLink(!!generated);

    if (storedKey === requiredKey) {
      navigate(`/messages/${id}`);
    }
  }, [id, navigate]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("https://mystmessage.onrender.com/api/message/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          content: message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSent(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError(data.error || "Failed to send message");
        setIsSending(false);
      }
    } catch (err) {
      setError("An error occurred while sending the message");
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-6 text-center">
      {isSent ? (
        <div className="animate-fade-in">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-green-600 mb-2">Message Sent Successfully!</h2>
            <p className="text-sm md:text-base text-gray-600">Redirecting to home page...</p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
            Send a Secret Message to {name || "User"}
          </h2>
          {error && <p className="text-sm md:text-base text-red-500 mb-2">{error}</p>}
          <div className="w-full max-w-md">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your secret message..."
              className="w-full px-4 py-2 border rounded-lg mb-4 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              disabled={isSending}
            ></textarea>
            <button
              className={`w-full md:w-auto bg-blue-600 text-white px-6 py-2 md:py-3 rounded-lg shadow-md transition ${
                isSending ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              onClick={handleSendMessage}
              disabled={isSending || !message.trim()}
            >
              {isSending ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>

            {hasGeneratedLink && (
              <button
                className="mt-4 w-full md:w-auto bg-green-600 text-white px-6 py-2 md:py-3 rounded-lg shadow-md hover:bg-green-700 transition"
                onClick={() => navigate(`/messages/${id}`)}
              >
                View Messages
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SecretMessage;

// Add this to your global CSS or index.css
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fade-in {
//   animation: fadeIn 0.5s ease-out forwards;
// }
