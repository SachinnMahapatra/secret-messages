import { useState, useRef } from "react";
import { FiShare, FiDownload } from "react-icons/fi";
import html2canvas from "html2canvas";

const ShareMessage = ({ messageId, content }) => {
  const messageRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    try {
      // Create a temporary div with beautiful styling for the message
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.innerHTML = `
        <div style="width: 600px; padding: 40px; background: linear-gradient(135deg, #4f46e5, #818cf8); color: white; border-radius: 16px; font-family: 'Inter', sans-serif; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
          <div style="position: relative;">
            <div style="position: absolute; top: -20px; right: -20px; width: 120px; height: 120px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); z-index: 0;"></div>
            <div style="position: absolute; bottom: -40px; left: -30px; width: 80px; height: 80px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); z-index: 0;"></div>
            <div style="font-size: 24px; margin-bottom: 20px; line-height: 1.5; position: relative; z-index: 1; font-weight: 500;">${content}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; position: relative; z-index: 1;">
              <div style="font-size: 14px; opacity: 0.8;">Secret Message</div>
              <div style="font-size: 12px; background: rgba(255, 255, 255, 0.2); padding: 4px 12px; border-radius: 20px;">mystmessage.netlify.app</div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(tempDiv);
      
      // Convert the styled div to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        backgroundColor: null,
      });
      
      // Remove the temporary div
      document.body.removeChild(tempDiv);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        // Create a download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `secret-message-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Reset sharing state after a short delay to show completion
        setTimeout(() => {
          setIsSharing(false);
        }, 1000);
      }, 'image/png');
    } catch (err) {
      console.error('Error sharing message:', err);
      alert('Failed to share message. Please try again.');
      setIsSharing(false);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className={`relative group flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
        isSharing 
          ? 'bg-indigo-100 text-indigo-600 cursor-not-allowed' 
          : 'text-gray-500 hover:text-white hover:bg-indigo-600'
      }`}
      title="Share as image"
      ref={messageRef}
      disabled={isSharing}
    >
      {isSharing ? (
        <div className="flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <FiShare size={18} className="opacity-0" />
        </div>
      ) : (
        <>
          <FiDownload size={16} className="group-hover:scale-110 transition-transform duration-200" />
          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Save as image
          </span>
        </>
      )}
    </button>
  );
};

export default ShareMessage; 