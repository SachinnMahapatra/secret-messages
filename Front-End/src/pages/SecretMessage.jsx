import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Eye, LockKeyhole, Send, Sparkles } from "lucide-react";

const SecretMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [hasGeneratedLink, setHasGeneratedLink] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("authKey");
    setHasGeneratedLink(!!localStorage.getItem(`generated-${id}`));
    if (storedKey === `auth-${id}`) navigate(`/messages/${id}`, { replace: true });
  }, [id, navigate]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);
    setError("");
    try {
      const response = await fetch("https://mystmessage.onrender.com/api/message/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, content: message.trim() }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "We couldn't send your note. Please try again.");

      setIsSent(true);
      window.setTimeout(() => navigate("/"), 4000);
    } catch (requestError) {
      setError(requestError.message || "Something went wrong while sending your note.");
      setIsSending(false);
    }
  };

  return (
    <div className="standalone-page send-page">
      <Link to="/" className="standalone-brand">
        <img className="brand-mark-image" src="/MystMessage-icon-ambient.png" alt="" /><span className="brand-name">Myst<span>Message</span></span>
      </Link>

      <div className="send-layout">
        <div className="send-intro">
          <div className="eyebrow"><span className="eyebrow-spark"><Sparkles size={13} /></span> A NOTE WITHOUT A NAME</div>
          <h1>Say the thing<br /><em>you really mean.</em></h1>
          <p>Leave a kind thought, a little truth, or just something they should hear today.</p>
          <div className="anonymous-stamp"><LockKeyhole size={16} /><span>Your message is sent anonymously</span></div>
        </div>

        <section className="send-card" aria-labelledby="send-heading">
          {isSent ? (
            <div className="sent-state" role="status">
              <span className="sent-check"><Check size={27} /></span>
              <span className="panel-step">NOTE DELIVERED</span>
              <h2>That’s one less thing left unsaid.</h2>
              <p>Your message has been sent anonymously. You’ll be taken back in a moment.</p>
              <button type="button" className="button button-light" onClick={() => navigate("/")}>Back to MystMessage</button>
            </div>
          ) : (
            <>
              <div className="send-card-top"><span className="note-avatar">{(name || "?").slice(0, 1).toUpperCase()}</span><div><span className="panel-step">A MESSAGE FOR</span><h2 id="send-heading">{name || "Someone special"}</h2></div><span className="anonymous-pill"><LockKeyhole size={13} /> Anonymous</span></div>
              {error && <div className="form-error" role="alert">{error}</div>}
              <form onSubmit={handleSendMessage}>
                <label htmlFor="secret-note" className="field-label">Your note</label>
                <textarea
                  id="secret-note"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Type it here. No name needed…"
                  className="text-field message-textarea"
                  rows={7}
                  disabled={isSending}
                  required
                />
                <p className="field-hint">Your identity isn’t attached to the message.</p>
                <button type="submit" className="button button-primary button-full send-submit" disabled={isSending || !message.trim()}>
                  {isSending ? <span className="spin-icon" /> : <Send size={17} />}
                  {isSending ? "Sending your note…" : "Send anonymously"}
                </button>
              </form>
              <div className="send-card-foot">
                <button type="button" className="back-button" onClick={() => navigate(-1)}><ArrowLeft size={15} /> Go back</button>
                {hasGeneratedLink && <button type="button" className="back-button" onClick={() => navigate(`/messages/${id}`)}>View inbox <Eye size={15} /></button>}
              </div>
            </>
          )}
        </section>
      </div>
      <p className="standalone-footer"><LockKeyhole size={13} /> Keep it kind. Keep it honest.</p>
    </div>
  );
};

export default SecretMessage;
