import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Share2, Facebook, Twitter, Instagram, Mail, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


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
      const response = await fetch("http://localhost:5000/api/user/create", {
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

  const handleShare = (platform) => {
    if (!link) return;
    
    let shareUrl;
    const text = `Send me anonymous messages on Secret Message!`;
    
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
    <div className="min-h-screen bg-gray-100">
      {/* Top Ad Banner */}
      <div className="w-full bg-white p-4 shadow-md mb-6">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
          <p className="text-gray-500">Ad Space (Top Banner)</p>
        </div>
      </div>
      
      {/* Notification for Copy */}
      {copied && (
        <div className="fixed top-20 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in z-50">
          <Check size={20} />
          <p>Link copied successfully!</p>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center text-center py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Secret Message Link</h2>
          
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition mb-4"
              onClick={handleCreateLink}
              disabled={loading}
            >
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
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
                
                {/* Share Options */}
                <div className="relative">
                  <button 
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
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
                          onClick={() => handleShare('whatsapp')} 
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
            className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition mb-8 flex items-center space-x-2"
            onClick={handleViewMessages}
          >
            <span>View My Messages</span>
          </button>
          
          {/* Bottom Ad Space */}
          <div className="w-full max-w-md bg-white shadow-lg p-4 rounded-lg mb-6">
            <div className="h-20 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
              <p className="text-gray-500">Ad Space (Bottom)</p>
            </div>
          </div>
        </div>
        
        {/* Side Ad Column */}
        <div className="md:w-64 py-8">
          <div className="bg-white shadow-lg p-4 rounded-lg mb-6">
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
              <p className="text-gray-500">Ad Space (Sidebar)</p>
            </div>
          </div>
          
          {/* Tips Box */}
          <div className="bg-white shadow-lg p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-3 border-b pb-2">Tips</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Share your link on social media</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Ask friends to send anonymous messages</span>
              </li>
              <li className="flex items-start space-x-2">
                <span>•</span>
                <span>Check messages regularly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-4 bg-white shadow-inner mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 Secret Message. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateLink;