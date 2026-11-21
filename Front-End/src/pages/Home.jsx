import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Eye, Link2, LockKeyhole, MessageCircle, Plus, Share2, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleShareLink = async () => {
    if (!userId) return;
    const name = localStorage.getItem("userName") || "me";
    const linkToShare = `${window.location.origin}/secret/${userId}?name=${encodeURIComponent(name)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Send me a secret message",
          text: "Leave me an anonymous note on MystMessage.",
          url: linkToShare,
        });
      } catch {
        // Closing the native share sheet is an expected action.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(linkToShare);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
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
          {userId && <p className="share-hint" aria-live="polite">{copied ? "Your link is ready to paste." : "Your inbox is saved on this device."}</p>}

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
