import { useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-page page-container">
      <button type="button" onClick={() => navigate(-1)} className="back-button terms-back"><ArrowLeft size={15} /> Back</button>
      <article className="terms-document">
        <div className="terms-document-icon"><LockKeyhole size={20} /></div>
        <span className="section-kicker">THE IMPORTANT DETAILS</span>
        <h1>Terms &amp; Privacy</h1>
        <p className="terms-lede">A few things to know before you create a message link.</p>
        <div className="terms-body">
          <section><h2>1. Project purpose</h2><p>This project is created solely for educational and skill development purposes. It is not intended for commercial use or production deployment.</p></section>
          <section><h2>2. Data storage and security</h2><p>Messages are stored in a MongoDB database with encryption. While messages are encrypted in the database, they can be decrypted by administrators through the admin panel. This is implemented for demonstration purposes only.</p></section>
          <section><h2>3. Your responsibilities</h2><p>You are responsible for the content you share through this platform. Please do not share sensitive or confidential information, as this is a demonstration project.</p></section>
          <section><h2>4. Privacy policy</h2><ul><li>Messages are encrypted before storage.</li><li>Messages can be accessed by administrators.</li><li>No personal data is collected beyond the message content.</li><li>Messages are stored temporarily for demonstration purposes.</li></ul></section>
          <section><h2>5. Limitations</h2><p>This is a demonstration project and should not be used for storing sensitive or confidential information. The platform is provided “as is” without any warranties.</p></section>
          <section><h2>6. Acceptance</h2><p>By accepting these terms, you acknowledge that this is a demonstration project and agree not to use it for storing sensitive or confidential information.</p></section>
        </div>
      </article>
    </div>
  );
};

export default TermsPage;
