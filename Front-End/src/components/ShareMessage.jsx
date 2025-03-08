import { useState, useRef, useEffect } from "react";
import { FiShare, FiDownload, FiCheck } from "react-icons/fi";
import html2canvas from "html2canvas";

const ShareMessage = ({ messageId, content }) => {
  const messageRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if Web Share API is available
  const canUseWebShare = () => {
    return navigator.share && navigator.canShare;
  };

  const generateImage = async () => {
    // Create a temporary div with beautiful styling for the message
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    
    // Adjust width for mobile
    const width = isMobile ? 320 : 600;
    
    tempDiv.innerHTML = `
      <div style="width: ${width}px; padding: ${isMobile ? '30px' : '40px'}; background: linear-gradient(135deg, #4f46e5, #818cf8); color: white; border-radius: 16px; font-family: 'Inter', sans-serif; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
        <div style="position: relative;">
          <div style="position: absolute; top: -20px; right: -20px; width: ${isMobile ? '80px' : '120px'}; height: ${isMobile ? '80px' : '120px'}; border-radius: 50%; background: rgba(255, 255, 255, 0.1); z-index: 0;"></div>
          <div style="position: absolute; bottom: -40px; left: -30px; width: ${isMobile ? '60px' : '80px'}; height: ${isMobile ? '60px' : '80px'}; border-radius: 50%; background: rgba(255, 255, 255, 0.1); z-index: 0;"></div>
          <div style="font-size: ${isMobile ? '18px' : '24px'}; margin-bottom: 20px; line-height: 1.5; position: relative; z-index: 1; font-weight: 500;">${content}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; position: relative; z-index: 1;">
            <div style="font-size: ${isMobile ? '12px' : '14px'}; opacity: 0.8;"></div>
            <div style="font-size: ${isMobile ? '10px' : '12px'}; background: rgba(255, 255, 255, 0.2); padding: 4px 12px; border-radius: 20px;">mystmessage.netlify.app</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(tempDiv);
    
    // Convert the styled div to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: isMobile ? 2 : 2,
      backgroundColor: null,
    });
    
    // Remove the temporary div
    document.body.removeChild(tempDiv);
    
    return canvas;
  };

  const handleShare = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    try {
      const canvas = await generateImage();
      
      // For mobile devices with Web Share API
      if (isMobile && canUseWebShare()) {
        canvas.toBlob(async (blob) => {
          const file = new File([blob], `secret-message-${Date.now()}.png`, { type: 'image/png' });
          
          try {
            await navigator.share({
              files: [file],
              title: 'Secret Message',
              text: 'Check out this secret message I received!'
            });
            
            // Show success state
            setShareSuccess(true);
            setTimeout(() => {
              setShareSuccess(false);
              setIsSharing(false);
            }, 2000);
          } catch (err) {
            // Fallback to download if share was cancelled or failed
            downloadImage(canvas);
          }
        }, 'image/png');
      } else {
        // For desktop or devices without Web Share API
        downloadImage(canvas);
      }
    } catch (err) {
      console.error('Error sharing message:', err);
      alert('Failed to share message. Please try again.');
      setIsSharing(false);
    }
  };

  const downloadImage = (canvas) => {
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
      
      // Show success state
      setShareSuccess(true);
      setTimeout(() => {
        setShareSuccess(false);
        setIsSharing(false);
      }, 2000);
    }, 'image/png');
  };

  return (
    <button 
      onClick={handleShare}
      className={`relative group flex items-center justify-center ${
        isMobile ? 'w-10 h-10' : 'w-9 h-9'
      } rounded-full transition-all duration-300 ${
        isSharing 
          ? 'bg-indigo-100 text-indigo-600 cursor-not-allowed' 
          : shareSuccess
            ? 'bg-green-100 text-green-600'
            : 'text-gray-500 hover:text-white hover:bg-indigo-600'
      }`}
      title={isMobile && canUseWebShare() ? "Share message" : "Save as image"}
      ref={messageRef}
      disabled={isSharing || shareSuccess}
    >
      {isSharing ? (
        <div className="flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          {isMobile && canUseWebShare() ? <FiShare size={18} className="opacity-0" /> : <FiDownload size={18} className="opacity-0" />}
        </div>
      ) : shareSuccess ? (
        <FiCheck size={isMobile ? 18 : 16} className="text-green-600" />
      ) : (
        <>
          {isMobile && canUseWebShare() ? (
            <FiShare size={18} className="group-hover:scale-110 transition-transform duration-200" />
          ) : (
            <FiDownload size={isMobile ? 18 : 16} className="group-hover:scale-110 transition-transform duration-200" />
          )}
          <span className={`absolute ${isMobile ? '-bottom-10' : '-top-10'} left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10`}>
            {isMobile && canUseWebShare() ? "Share message" : "Save as image"}
          </span>
        </>
      )}
    </button>
  );
};

export default ShareMessage; 