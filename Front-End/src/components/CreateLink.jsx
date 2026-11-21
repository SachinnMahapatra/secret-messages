import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Copy, Link2, LoaderCircle, Mail, MessageCircle, MessagesSquare, Share2, Sparkles } from "lucide-react";
import TermsAndPrivacy from "./TermsAndPrivacy";

const CreateLink = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateLink = async (event) => {
    event.preventDefault();
    if (!name.trim() || !termsAccepted || loading) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://mystmessage.onrender.com/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await response.json();

      if (!response.ok || !data.success || !data.user?.uniqueLink) {
        throw new Error(data.error || "We couldn't create your link. Please try again.");
      }

      const uniqueId = data.user.uniqueLink;
      const generatedLink = `${window.location.origin}/secret/${uniqueId}?name=${encodeURIComponent(name.trim())}`;
      setLink(generatedLink);
      localStorage.setItem("authKey", `auth-${uniqueId}`);
      localStorage.setItem("userId", uniqueId);
      localStorage.setItem("userName", name.trim());
      localStorage.setItem(`generated-${uniqueId}`, "true");
    } catch (requestError) {
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setError("Your browser couldn't copy the link. Select and copy it instead.");
    }
  };

  const shareMessages = [
    "Your secrets are safe with me! Leave me an anonymous note:",
    "Got something to say? Tell me anonymously:",
    "A little honesty, no names attached. Drop me a note:",
    "Curious what you really think? Leave me a message:",
  ];

  const handleShare = (platform) => {
    if (!link) return;
    const text = shareMessages[Math.floor(Math.random() * shareMessages.length)];
    const shareTargets = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${link}`)}`,
      email: `mailto:?subject=${encodeURIComponent("Send me an anonymous message")}&body=${encodeURIComponent(`${text} ${link}`)}`,
    };
    const target = shareTargets[platform];
    if (target) window.open(target, "_blank", "noopener,noreferrer,width=640,height=520");
    setShowShareOptions(false);
  };

  const handleViewMessages = () => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) navigate(`/messages/${storedUserId}`);
  };

  return (
    <div className="create-page page-container">
      <section className="create-intro">
        <div className="eyebrow"><span className="eyebrow-spark"><Sparkles size={13} /></span> YOUR VERY OWN INBOX</div>
        <h1>Let the honest<br /><em>notes find you.</em></h1>
        <p>Start with your name. We’ll make a personal link where friends can leave you anonymous messages.</p>
        <div className="create-points">
          <div><span className="point-check"><Check size={14} /></span><span><strong>One link, all yours</strong><small>Share it wherever your people are.</small></span></div>
          <div><span className="point-check"><Check size={14} /></span><span><strong>No sign-up hoops</strong><small>Your inbox is ready in a moment.</small></span></div>
          <div><span className="point-check"><Check size={14} /></span><span><strong>Anonymous by default</strong><small>Messages arrive without a sender name.</small></span></div>
        </div>
        <div className="create-note"><span className="note-quote-mark">“</span><p>Sometimes the best things are easier to say without a name attached.</p></div>
      </section>

      <section className="create-panel" aria-labelledby="create-heading">
        <div className="panel-heading">
          <span className="panel-icon"><MessagesSquare size={20} /></span>
          <div><span className="panel-step">LET’S GET STARTED</span><h2 id="create-heading">Create your link</h2></div>
        </div>

        <form onSubmit={handleCreateLink}>
          <label htmlFor="profile-name" className="field-label">What should we call you?</label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your first name or nickname"
            className="text-field"
            maxLength={60}
            autoComplete="given-name"
            required
          />
          <p className="field-hint">This name appears on your public message page.</p>

          <div className="terms-wrap"><TermsAndPrivacy onAccept={setTermsAccepted} /></div>

          {error && <div className="form-error" role="alert">{error}</div>}
          <button type="submit" className="button button-primary button-full" disabled={loading || !name.trim() || !termsAccepted}>
            {loading ? <LoaderCircle className="spin" size={18} /> : <Link2 size={18} />}
            {loading ? "Making your link…" : "Create my link"}
          </button>
          <p className="form-footnote"><span className="tiny-lock" /> You can start receiving messages as soon as you share it.</p>
        </form>

        {link && (
          <div className="link-result" aria-live="polite">
            <div className="result-success"><span className="success-icon"><Check size={16} /></span><div><strong>Your link is ready, {name.trim()}!</strong><span>Share it with the people you trust.</span></div></div>
            <div className="copy-row">
              <a className="generated-link" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              <button type="button" className="copy-button" onClick={handleCopyLink} aria-label={copied ? "Link copied" : "Copy your link"}>
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <button type="button" className="button button-dark button-full" onClick={() => setShowShareOptions((visible) => !visible)}>
              <Share2 size={17} /> {showShareOptions ? "Close sharing options" : "Share your link"}
            </button>
            {showShareOptions && (
              <div className="share-options">
                <button type="button" onClick={() => handleShare("facebook")}><span className="social-mark social-facebook">f</span>Facebook</button>
                <button type="button" onClick={() => handleShare("twitter")}><span className="social-mark social-x">𝕏</span>Twitter / X</button>
                <button type="button" onClick={() => handleShare("whatsapp")}><span className="social-mark social-whatsapp">wa</span>WhatsApp</button>
                <button type="button" onClick={() => handleShare("email")}><Mail size={16} />Email</button>
              </div>
            )}
            {copied && <p className="copy-confirm"><Check size={14} /> Copied to clipboard</p>}
          </div>
        )}

        <div className="panel-bottom">
          <span>Already have an inbox?</span>
          <button type="button" onClick={handleViewMessages}>Open your messages <MessageCircle size={15} /></button>
        </div>
      </section>
    </div>
  );
};

export default CreateLink;
