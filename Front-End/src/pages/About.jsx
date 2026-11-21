import { Link } from "react-router-dom";
import { EyeOff, Heart, Link2, LockKeyhole, MessageCircle, ShieldCheck, Sparkles, Users } from "lucide-react";

const features = [
  { icon: EyeOff, title: "Anonymous notes", body: "People can share a thought without putting their name beside it." },
  { icon: Link2, title: "One simple link", body: "Create a personal page and pass it along wherever you like." },
  { icon: MessageCircle, title: "A private inbox", body: "Keep the messages you receive together in one place." },
  { icon: Heart, title: "Made for real words", body: "A quiet little space for kindness, honesty, and everything between." },
];

const About = () => (
  <div className="about-page">
    <section className="about-hero page-container">
      <div className="about-hero-copy">
        <div className="eyebrow"><span className="eyebrow-spark"><Sparkles size={13} /></span> A DIFFERENT KIND OF MESSAGE</div>
        <h1>Sometimes it’s easier<br />to say it <em>without a name.</em></h1>
        <p>MystMessage is a small place for people to leave you anonymous messages. No big setup, no awkward introductions—just a link and whatever someone wants to say.</p>
        <Link to="/create-link" className="button button-primary">Make your own link <Link2 size={17} /></Link>
      </div>
      <div className="about-art" aria-hidden="true"><span className="about-art-ring" /><span className="about-art-quote">“</span><div className="about-art-note"><span className="note-avatar">?</span><p>Just wanted to say, you’re doing better than you think.</p><span>ANONYMOUSLY, WITH CARE</span></div><span className="about-art-heart">♥</span></div>
    </section>

    <section className="about-manifesto">
      <div className="page-container manifesto-inner">
        <div><span className="section-kicker">WHY MYSTMESSAGE</span><h2>More honest words.<br /><em>Less pressure.</em></h2></div>
        <p>Sometimes a little distance makes it easier to be open. MystMessage gives your friends a simple way to tell you what’s on their mind—and gives you a place to read it when you’re ready.</p>
      </div>
    </section>

    <section className="about-features page-container">
      <div className="section-heading"><span className="section-kicker">THE GOOD STUFF</span><h2>Small by design.</h2><p>Everything you need to make a little room for honest messages.</p></div>
      <div className="about-feature-grid">
        {features.map(({ icon: Icon, title, body }) => <article className="about-feature-card" key={title}><span className="feature-icon"><Icon size={20} /></span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section className="about-how">
      <div className="page-container">
        <div className="section-heading"><span className="section-kicker">HOW IT WORKS</span><h2>From link to little note.</h2></div>
        <div className="about-steps">
          <div><span className="about-step-icon"><Users size={19} /></span><h3>Make your page</h3><p>Add the name you want friends to see and create your link.</p></div>
          <div><span className="about-step-icon"><Link2 size={19} /></span><h3>Share it around</h3><p>Send it in a message, post it to your story, or add it to your bio.</p></div>
          <div><span className="about-step-icon"><LockKeyhole size={19} /></span><h3>Check your inbox</h3><p>Read the notes people leave from your private inbox on this device.</p></div>
        </div>
      </div>
    </section>

    <section className="about-founder page-container">
      <div className="founder-avatar">SM</div>
      <div><span className="section-kicker">A NOTE FROM THE CREATOR</span><h2>Built by Sachin Mahapatra.</h2><p>MystMessage is an independent project made to explore a more thoughtful kind of online conversation.</p><a href="https://github.com/SachinnMahapatra" target="_blank" rel="noopener noreferrer" className="text-link">Find the project on GitHub <ShieldCheck size={15} /></a></div>
    </section>

    <section className="about-bottom-cta"><div className="page-container"><div><span className="section-kicker">YOUR WORDS, YOUR SPACE</span><h2>Want to hear what people have to say?</h2></div><Link to="/create-link" className="button button-dark">Create your link <Link2 size={17} /></Link></div></section>
  </div>
);

export default About;
