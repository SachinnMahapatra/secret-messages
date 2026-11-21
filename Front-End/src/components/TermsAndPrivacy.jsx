import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const TermsAndPrivacy = ({ onAccept }) => (
  <div className="terms-check-card">
    <span className="terms-shield"><ShieldCheck size={17} /></span>
    <label htmlFor="accept-terms" className="terms-label">
      <input
        id="accept-terms"
        type="checkbox"
        onChange={(event) => onAccept(event.target.checked)}
      />
      <span>I agree to the <Link to="/terms">Terms and Conditions &amp; Privacy Policy</Link>.</span>
    </label>
  </div>
);

export default TermsAndPrivacy;
