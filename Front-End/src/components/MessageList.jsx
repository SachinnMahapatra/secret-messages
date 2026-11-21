import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Inbox, LockKeyhole, MessageCircle, RefreshCw, Sparkles } from "lucide-react";
import ShareMessage from "./ShareMessage";

const POLLING_INTERVAL = 10000;

const MessageList = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMessages = useCallback(async (isPolling = false) => {
    if (isPolling) setRefreshing(true);
    else setIsLoading(true);

    try {
      const response = await fetch(`https://mystmessage.onrender.com/api/user/${id}/messages`);
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Couldn't fetch your messages.");
      setMessages(data.messages || []);
      setError("");
    } catch (requestError) {
      setError(requestError.message || "An error occurred while fetching your messages.");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => {
    const authorized = localStorage.getItem("authKey") === `auth-${id}`;
    setIsAuthorized(authorized);
    if (authorized) fetchMessages();
    else setIsLoading(false);
  }, [fetchMessages, id]);

  useEffect(() => {
    if (!isAuthorized) return undefined;
    const intervalId = window.setInterval(() => fetchMessages(true), POLLING_INTERVAL);
    return () => window.clearInterval(intervalId);
  }, [fetchMessages, isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="standalone-page dashboard-page">
        <Link to="/" className="standalone-brand"><img className="brand-mark-image" src="/MystMessage-icon-ambient.png" alt="" /><span className="brand-name">Myst<span>Message</span></span></Link>
        <section className="access-card">
          <span className="access-icon"><LockKeyhole size={25} /></span>
          <span className="panel-step">PRIVATE INBOX</span>
          <h1>This inbox is locked.</h1>
          <p>You need the same browser where you created this link to read its messages.</p>
          <Link to="/" className="button button-primary"><ArrowLeft size={16} /> Return home</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="standalone-page dashboard-page">
      <div className="dashboard-topbar">
        <Link to="/" className="standalone-brand"><img className="brand-mark-image" src="/MystMessage-icon-ambient.png" alt="" /><span className="brand-name">Myst<span>Message</span></span></Link>
        <Link to="/" className="back-button"><ArrowLeft size={15} /> Home</Link>
      </div>

      <main className="dashboard-content">
        <div className="dashboard-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-spark"><Sparkles size={13} /></span> YOUR PRIVATE SPACE</div>
            <h1>Your message inbox.</h1>
            <p>Little notes from people who wanted you to know.</p>
          </div>
          <div className="inbox-count"><Inbox size={17} /><strong>{messages.length}</strong><span>{messages.length === 1 ? "message" : "messages"}</span></div>
        </div>

        {error && <div className="dashboard-error" role="alert"><MessageCircle size={17} /><span>{error}</span></div>}

        <section className="inbox-panel" aria-label="Received messages">
          <div className="inbox-panel-header">
            <div><span className="panel-step">YOUR NOTES</span><h2>Messages</h2></div>
            <button type="button" className="button button-light refresh-button" onClick={() => fetchMessages(true)} disabled={refreshing || isLoading}>
              <RefreshCw size={15} className={refreshing ? "spin" : ""} /> {refreshing ? "Refreshing…" : "Refresh"}
            </button>
          </div>

          {isLoading ? (
            <div className="inbox-empty"><span className="loading-orbit" /><strong>Opening your inbox…</strong><p>Your messages will be here in just a moment.</p></div>
          ) : messages.length > 0 ? (
            <div className="message-grid" aria-live="polite">
              {messages.map((msg) => (
                <article key={msg._id} className="received-message">
                  <div className="received-message-top"><span className="message-avatar"><MessageCircle size={16} /></span><span className="anonymous-pill"><LockKeyhole size={12} /> Anonymous</span><ShareMessage messageId={msg._id} content={msg.content} /></div>
                  <p className="received-message-content">{msg.content}</p>
                  <time className="received-message-time" dateTime={msg.createdAt || undefined}>
                    {new Date(msg.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </time>
                </article>
              ))}
            </div>
          ) : (
            <div className="inbox-empty">
              <span className="empty-inbox-icon"><Inbox size={25} /></span>
              <strong>No messages just yet</strong>
              <p>Share your link with a few people and check back soon.</p>
              <Link to="/" className="empty-home-link">Go to your home page <ArrowLeft size={14} /></Link>
            </div>
          )}
        </section>
        <p className="dashboard-poll-note"><span className="live-dot" /> Inbox checks for new notes automatically every 10 seconds.</p>
      </main>
    </div>
  );
};

export default MessageList;
