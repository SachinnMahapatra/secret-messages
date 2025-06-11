import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Terms and Conditions & Privacy Policy</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Project Purpose</h2>
              <p className="text-gray-600 leading-relaxed">
                This project is created solely for educational and skill development purposes. It is not intended for commercial use or production deployment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Data Storage and Security</h2>
              <p className="text-gray-600 leading-relaxed">
                All messages are stored in a MongoDB database with encryption. While messages are encrypted in the database, they can be decrypted by administrators through the admin panel. This is implemented for demonstration purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. User Responsibilities</h2>
              <p className="text-gray-600 leading-relaxed">
                Users are responsible for the content they share through this platform. Please do not share sensitive or confidential information as this is a demonstration project.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Privacy Policy</h2>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
                <li>All messages are encrypted before storage</li>
                <li>Messages can be accessed by administrators</li>
                <li>No personal data is collected beyond the message content</li>
                <li>Messages are stored temporarily for demonstration purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Limitations</h2>
              <p className="text-gray-600 leading-relaxed">
                This is a demonstration project and should not be used for storing sensitive or confidential information. The platform is provided "as is" without any warranties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Acceptance</h2>
              <p className="text-gray-600 leading-relaxed">
                By accepting these terms, you acknowledge that this is a demonstration project and agree not to use it for storing sensitive or confidential information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 