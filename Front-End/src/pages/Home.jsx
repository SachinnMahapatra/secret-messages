import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLink, FiEye, FiShare2, FiPlus } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if userId exists in localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Function to handle sharing an existing link
  const handleShareLink = () => {
    const linkToShare = `${window.location.origin}/secret/${userId}?name=${encodeURIComponent(name)}`;
    
    // Check if the Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: 'Send me a secret message',
        text: 'Send me an anonymous message!',
        url: linkToShare,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(linkToShare)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy link: ', err));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl text-center px-4 py-12 md:py-16">
        <div className="mb-10">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
            <FiLink className="w-10 h-10 text-white" />
          </div>
          <h1 className="premium-title text-3xl md:text-4xl lg:text-5xl mb-4">
            Welcome to Secret Message
          </h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-md mx-auto mb-10">
            Create your unique secret message link and share it anonymously with
            friends!
          </p>
        </div>

        <div className={`flex flex-col space-y-3 md:space-y-4 w-full max-w-md ${userId ? 'mb-8' : ''}`}>
          {!userId ? (
            <button
              className="premium-btn premium-btn-primary flex items-center justify-center"
              onClick={() => navigate("/create-link")}
            >
              <FiLink className="mr-2" /> Create Your Link
            </button>
          ) : (
            <>
              <button
                className="premium-btn premium-btn-primary flex items-center justify-center"
                onClick={() => navigate("/create-link")}
              >
                <FiPlus className="mr-2" /> Create New Link
              </button>

              <button
                className="premium-btn premium-btn-outline flex items-center justify-center relative"
                onClick={handleShareLink}
              >
                <FiShare2 className="mr-2" /> 
                {copied ? 'Link Copied!' : 'Share Existing Link'}
                
                {copied && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs py-1 px-2 rounded animate-fade-in">
                    Copied!
                  </span>
                )}
              </button>

              <button
                className="premium-btn premium-btn-secondary flex items-center justify-center"
                onClick={() => navigate(`/messages/${userId}`)}
              >
                <FiEye className="mr-2" /> View Messages
              </button>
            </>
          )}
        </div>
      </div>

      <footer className="w-full py-4 text-center text-gray-500 text-sm border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <p>© {new Date().getFullYear()} Secret Message. All rights reserved.</p> */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
