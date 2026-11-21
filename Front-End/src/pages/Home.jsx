import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Check, Copy, Eye, Link2, LockKeyhole, MessageCircle, Plus, Share2, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [savedLink, setSavedLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("userName") || "";
    setUserId(storedUserId);
    setUserName(storedName);
    if (storedUserId) {
      const nameParam = storedName ? `?name=${encodeURIComponent(storedName)}` : "";
      setSavedLink(`${window.location.origin}/secret/${storedUserId}${nameParam}`);
    }
  }, []);

  const handleCopyLink = async () => {
    if (!savedLink) return;
    try {
      await navigator.clipboard.writeText(savedLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleShareLink = async () => {
    if (!savedLink) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Send me a secret message",
          text: "Leave me an anonymous note on MystMessage.",
          url: savedLink,
        });
      } catch {
        // Closing the native share sheet is an expected action.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(savedLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="home-page">
      <section className="home-hero page-container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-spark"><Sparkles size={13} /></span> A little mystery goes a long way</div>
          <h1>Say what you mean.<br /><em>Keep your name out of it.</em></h1>
          <p className="hero-description">Give your friends a place to be completely honest. Make one link, share it anywhere, and read the notes that come back.</p>

          <div className="hero-actions">
            <button type="button" className="button button-primary" onClick={() => navigate("/create-link")}>
              {userId ? <><Plus size={18} /> Create a new link</> : <><Link2 size={18} /> Create your link</>}
            </button>
            {userId ? (
              <>
                <button type="button" className="button button-light" onClick={handleShareLink}>
                  <Share2 size={17} /> {copied ? "Link copied" : "Share my link"}
                </button>
                <button type="button" className="button button-quiet" onClick={() => navigate(`/messages/${userId}`)}>
                  <Eye size={17} /> View inbox
                </button>
              </>
            ) : (
              <span className="hero-microcopy"><LockKeyhole size={14} /> No account needed</span>
            )}
          </div>
          {userId && savedLink && (
            <div className="home-link-card">
              <div className="home-link-heading">
                <span className="home-link-icon"><Link2 size={16} /></span>
                <div><span className="panel-step">{userName ? `${userName.toUpperCase()}’S LINK` : "YOUR MESSAGE LINK"}</span><strong>Your Link is ready to share</strong></div>
              </div>
              <button type="button" className="home-link-copy" onClick={handleCopyLink} aria-label="Copy your full secret message link">
                <span className="home-link-preview">{copied ? "Copied to clipboard" : `${window.location.host}/secret/••••••`}</span>
                <span className="home-link-copy-icon">{copied ? <Check size={17} /> : <Copy size={17} />}</span>
              </button>
              <p className="home-link-hint" aria-live="polite">{copied ? "Your full link is copied and ready to paste." : "Tap the link to copy the full address."}</p>
            </div>
          )}
          {userId && !savedLink && <p className="share-hint" aria-live="polite">Your inbox is saved on this device.</p>}

          <div className="hero-trust-row">
            <div className="avatar-stack" aria-hidden="true"><span>J</span><span>M</span><span>A</span><span>+</span></div>
            <p><strong>A better way to say it</strong><br />Anonymous notes, without the awkward intro.</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="Example anonymous message card">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="floating-label label-top"><span className="label-icon"><LockKeyhole size={14} /></span> Private by design</div>
          <article className="note-card">
            <div className="note-card-top"><span className="note-avatar">J</span><span>ANONYMOUS NOTE</span><span className="note-dots">•••</span></div>
            <p className="note-text">“You make the room feel lighter. I hope someone tells you that today.”</p>
            <div className="note-card-bottom"><span>just now</span><span className="note-heart">♥</span></div>
          </article>
          <div className="floating-label label-bottom"><MessageCircle size={15} /> A note from someone who cares</div>
          <span className="visual-star star-one">✳</span>
          <span className="visual-star star-two">✦</span>
        </div>
      </section>

      <section className="how-section">
        <div className="page-container">
          <div className="section-heading">
            <span className="section-kicker">THREE LITTLE STEPS</span>
            <h2>Make room for honesty.</h2>
            <p>It takes less time than writing a text.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-icon step-purple"><Link2 size={19} /></span><span className="step-number">01</span><h3>Make your link</h3><p>Choose a name and create your own anonymous message page.</p></article>
            <article className="step-card"><span className="step-icon step-yellow"><Share2 size={19} /></span><span className="step-number">02</span><h3>Pass it around</h3><p>Share your link with friends, in your bio, or wherever you like.</p></article>
            <article className="step-card"><span className="step-icon step-green"><MessageCircle size={19} /></span><span className="step-number">03</span><h3>Read what comes in</h3><p>Open your inbox to find the messages people leave for you.</p></article>
          </div>
          <div className="home-bottom-cta">
            <div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Your link is one small step away.</h2></div>
            <button type="button" className="button button-dark" onClick={() => navigate("/create-link")}>Get started <ArrowUpRight size={17} /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
