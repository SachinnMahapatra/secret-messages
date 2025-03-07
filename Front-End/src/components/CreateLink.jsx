import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Share2, Facebook, Twitter, Instagram, Mail, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FiLink, FiMessageSquare, FiLoader, FiCheckCircle } from 'react-icons/fi';

const CreateLink = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const navigate = useNavigate();

  const handleCreateLink = async () => {
    if (!name.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch("https://mystmessage.onrender.com/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (data.success) {
        const uniqueId = data.user.uniqueLink;
        const generatedLink = `${window.location.origin}/secret/${uniqueId}?name=${encodeURIComponent(name)}`;

        setLink(generatedLink);
        localStorage.setItem("authKey", `auth-${uniqueId}`);
        localStorage.setItem("userId", uniqueId);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMessages = () => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      navigate(`/messages/${storedUserId}`);
    }
  };

  const handleCopyLink = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const shareMessages = [
    "🔒 Your secrets are safe with me! 📝 Share anything, anytime—completely anonymous! 🤫👇",
    "💬 Got something to say? Say it anonymously! No one will ever know! 🤐👇",
    "🤭 Shhh... Drop me a secret message! I won't know who sent it! 🔥👇",
    "👀 Curious to know what people think about you? Let them send messages anonymously! 🔗👇",
    "🚀 Speak your heart out, completely anonymously! Drop me a message now! 💌👇",
  ];

  const getRandomMessage = () => {
    return shareMessages[Math.floor(Math.random() * shareMessages.length)];
  };

  const handleShare = (platform) => {
    if (!link) return;
    
    let shareUrl;
    const text = getRandomMessage();
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
        break;
      case 'Whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + link)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Send me anonymous messages!')}&body=${encodeURIComponent(text + ' ' + link)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'Secret Message',
            text: text,
            url: link,
          });
          return;
        }
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    
    setShowShareOptions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl text-center px-4 py-12 md:py-16">
        <div className="mb-10">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
            <FiMessageSquare className="w-10 h-10 text-white" />
          </div>
          <h2 className="premium-title text-3xl md:text-4xl lg:text-5xl mb-4">
            Create Your Secret Message Link
          </h2>
          <p className="text-gray-600 text-sm md:text-lg max-w-md mx-auto mb-10">
            Generate a unique link to receive anonymous messages from your friends!
          </p>
        </div>

        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="premium-input mb-4"
          />
          <button
            className="premium-btn premium-btn-primary w-full flex items-center justify-center"
            onClick={handleCreateLink}
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin mr-2" />
            ) : (
              <FiLink className="mr-2" />
            )}
            {loading ? "Generating..." : "Generate Link"}
          </button>

          {link && (
            <div className="mt-4 border-t pt-4">
              <p className="text-gray-700 mb-3">Share this link to receive secret messages:</p>
              <div className="flex mb-4">
                <input
                  type="text"
                  readOnly
                  value={link}
                  className="flex-1 px-3 py-2 border rounded-l-lg text-gray-600"
                />
                <button 
                  onClick={handleCopyLink}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  {copied ? <FiCheckCircle size={20} /> : <Copy size={20} />}
                </button>
              </div>

              {/* Share Options */}
              <div className="relative">
                <button 
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="premium-btn premium-btn-outline w-full flex items-center justify-center space-x-2"
                >
                  <Share2 size={20} />
                  <span>Share Link</span>
                </button>

                {showShareOptions && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl p-4 z-10 animate-fade-in">
                    <p className="text-gray-700 mb-3 font-medium">Share via:</p>
                    <div className="grid grid-cols-4 gap-3">
                      <button 
                        onClick={() => handleShare('facebook')} 
                        className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Facebook size={24} className="text-blue-600" />
                        <span className="text-xs mt-1">Facebook</span>
                      </button>
                      <button 
                        onClick={() => handleShare('twitter')} 
                        className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Twitter size={24} className="text-blue-400" />
                        <span className="text-xs mt-1">Twitter</span>
                      </button>
                      <button 
                        onClick={() => handleShare('Whatsapp')} 
                        className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <FaWhatsapp size={24} className="text-green-500" />
                        <span className="text-xs mt-1">WhatsApp</span>
                      </button>
                      <button 
                        onClick={() => handleShare('email')} 
                        className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Mail size={24} className="text-gray-600" />
                        <span className="text-xs mt-1">Email</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          className="premium-btn premium-btn-secondary w-full max-w-md flex items-center justify-center"
          onClick={handleViewMessages}
        >
          <FiMessageSquare className="mr-2" /> View My Messages
        </button>
      </div>

      <footer className="w-full py-4 text-center text-gray-500 text-sm border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Secret Message. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateLink;