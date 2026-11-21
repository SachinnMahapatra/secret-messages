import { useState } from "react";
import { Check, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";

const ShareMessage = ({ content }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [error, setError] = useState("");

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const canUseWebShare = typeof navigator !== "undefined" && !!navigator.share && !!navigator.canShare;

  const generateImage = async () => {
    const wrapper = document.createElement("div");
    Object.assign(wrapper.style, { position: "fixed", left: "-10000px", top: "0", zIndex: "-1" });

    const card = document.createElement("div");
    Object.assign(card.style, {
      width: isMobile ? "320px" : "600px",
      boxSizing: "border-box",
      padding: isMobile ? "32px" : "48px",
      borderRadius: "26px",
      color: "#f9f7ff",
      background: "linear-gradient(145deg, #292544 0%, #6250a2 100%)",
      fontFamily: "Inter, Arial, sans-serif",
      boxShadow: "0 24px 60px rgba(25, 20, 55, 0.24)",
    });

    const eyebrow = document.createElement("div");
    eyebrow.textContent = "A NOTE FOR YOU · ANONYMOUSLY";
    Object.assign(eyebrow.style, { fontSize: "12px", letterSpacing: "2px", fontWeight: "700", color: "#d5caff", marginBottom: "26px" });

    const message = document.createElement("div");
    message.textContent = content;
    Object.assign(message.style, { fontFamily: "Georgia, serif", fontSize: isMobile ? "24px" : "34px", lineHeight: "1.38", overflowWrap: "anywhere", whiteSpace: "pre-wrap" });

    const footer = document.createElement("div");
    footer.textContent = "MystMessage";
    Object.assign(footer.style, { marginTop: "38px", color: "#d5caff", fontSize: "14px", fontWeight: "700", letterSpacing: "0.4px" });

    card.append(eyebrow, message, footer);
    wrapper.appendChild(card);
    document.body.appendChild(wrapper);
    try {
      return await html2canvas(card, { scale: 2, backgroundColor: null });
    } finally {
      wrapper.remove();
    }
  };

  const canvasToBlob = (canvas) => new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not create the image.")), "image/png");
  });

  const downloadImage = async (canvas) => {
    const blob = await canvasToBlob(canvas);
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `mystmessage-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);
    setError("");
    try {
      const canvas = await generateImage();
      if (isMobile && canUseWebShare) {
        const blob = await canvasToBlob(canvas);
        const file = new File([blob], `mystmessage-${Date.now()}.png`, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: "A secret message", text: "A little note from MystMessage." });
        } else {
          await downloadImage(canvas);
        }
      } else {
        await downloadImage(canvas);
      }
      setShareSuccess(true);
      window.setTimeout(() => setShareSuccess(false), 1800);
    } catch (shareError) {
      if (shareError.name !== "AbortError") setError("Couldn't prepare this image. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`share-message-button${shareSuccess ? " is-success" : ""}`}
      title={isMobile && canUseWebShare ? "Share message" : "Save message as an image"}
      aria-label={error || (isMobile && canUseWebShare ? "Share message" : "Save message as an image")}
      disabled={isSharing}
    >
      {isSharing ? <span className="spin-icon" /> : shareSuccess ? <Check size={16} /> : isMobile && canUseWebShare ? <Share2 size={16} /> : <Download size={16} />}
    </button>
  );
};

export default ShareMessage;
