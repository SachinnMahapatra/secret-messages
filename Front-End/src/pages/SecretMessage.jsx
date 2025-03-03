import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const SecretMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const [hasGeneratedLink, setHasGeneratedLink] = useState(false); // ✅ New state

  // ✅ Check if the user is the owner
  useEffect(() => {
    const storedKey = localStorage.getItem("authKey");
    const requiredKey = `auth-${id}`;
    
    // ✅ Check if user has already generated the link
    const generated = localStorage.getItem(`generated-${id}`);
    setHasGeneratedLink(!!generated);

    if (storedKey === requiredKey) {
      navigate(`/messages/${id}`);
    }
  }, [id, navigate]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

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
      }
    } catch (err) {
      setError("An error occurred while sending the message");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      {isSent ? (
        <>
          <h2 className="text-2xl font-bold text-green-600">Message Sent Successfully!</h2>
          <p className="text-gray-600">Redirecting to home page...</p>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Send a Secret Message to {name || "User"}
          </h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
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

          {/* ✅ "View Messages" tabhi dikhega jab link generate kiya ho */}
          {hasGeneratedLink && (
            <button
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
              onClick={() => navigate(`/messages/${id}`)}
            >
              View Messages
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SecretMessage;
