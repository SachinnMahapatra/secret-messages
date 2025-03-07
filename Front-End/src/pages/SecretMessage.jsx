import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FiSend, FiMail, FiCheck, FiArrowLeft, FiEye } from "react-icons/fi";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6">
      <div className="w-full max-w-xl">
        {isSent ? (
          <div className="premium-card p-8 text-center animate-fade-in">
            <div className="success-checkmark mb-6">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-green-600 mb-3">Message Sent Successfully!</h2>
            <p className="text-sm md:text-base text-gray-600 mb-6">Your secret message has been delivered. Redirecting to home page...</p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        ) : (
          <div className="premium-card p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center mr-3">
                <FiMail className="w-5 h-5 text-white" />
              </div>
              <h2 className="premium-title text-xl md:text-3xl">
                Send a Secret Message
              </h2>
            </div>
            
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm md:text-base text-indigo-800">
                <span className="font-semibold">To:</span> {name || "User"}
              </p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-500 flex items-start">
                <span className="mr-2 mt-0.5">⚠️</span>
                <p>{error}</p>
              </div>
            )}
            
            <div className="mb-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your secret message here..."
                className="premium-input"
                rows="5"
                disabled={isSending}
              ></textarea>
              <p className="mt-2 text-xs text-gray-500">
                This message will be sent anonymously. The recipient won't know who sent it.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <button
                className={`premium-btn premium-btn-primary flex-1 ${
                  isSending ? 'opacity-75 cursor-not-allowed' : ''
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
                  <>
                    <FiSend className="mr-2" /> Send Message
                  </>
                )}
              </button>
              
              <button
                className="premium-btn premium-btn-outline"
                onClick={() => navigate('/')}
              >
                <FiArrowLeft className="mr-2" /> Back to Home
              </button>
              
              {hasGeneratedLink && (
                <button
                  className="premium-btn premium-btn-secondary mt-3 md:mt-0"
                  onClick={() => navigate(`/messages/${id}`)}
                >
                  <FiEye className="mr-2" /> View Messages
                </button>
              )}
            </div>
          </div>
        )}
      </div>
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
