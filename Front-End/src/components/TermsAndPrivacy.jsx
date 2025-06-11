import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndPrivacy = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    setAccepted(true);
    onAccept(true);
  };

  const handleViewFullTerms = () => {
    navigate('/terms');
  };

  return (
    <div className="terms-container bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={accepted}
          onChange={handleAccept}
          className="form-checkbox h-5 w-5 text-blue-600 mt-1"
        />
        <div>
          <p className="text-gray-700 text-sm">
            I agree to the{' '}
            <button
              onClick={handleViewFullTerms}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Terms and Conditions & Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy; 