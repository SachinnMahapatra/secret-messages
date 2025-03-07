import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiMessageSquare, FiShield, FiUsers, FiEye, FiEyeOff, FiHeart, FiGithub } from 'react-icons/fi';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="premium-card p-5 md:p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-all duration-300">
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full gradient-primary flex items-center justify-center mb-3 md:mb-4">
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
    </div>
    <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">{title}</h3>
    <p className="text-xs md:text-sm text-gray-600">{description}</p>
  </div>
);

const TeamMember = ({ name, role, image }) => (
  <div className="premium-card p-5 md:p-6 flex flex-col items-center text-center">
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 md:mb-4 bg-gray-100 flex items-center justify-center">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <FiUsers className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
      )}
    </div>
    <h3 className="font-semibold text-gray-800 text-sm md:text-base">{name}</h3>
    <p className="text-xs md:text-sm text-gray-500">{role}</p>
  </div>
);

const About = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="py-8 md:py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="premium-title text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6">About Secret Message</h1>
          <p className="text-gray-600 text-sm md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 md:mb-10">
            A modern platform that lets you exchange secret messages securely and anonymously.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
            <Link to="/" className="premium-btn premium-btn-primary">
              Get Started
            </Link>
            <a 
              href="https://github.com/SachinnMahapatra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="premium-btn premium-btn-outline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="premium-title text-xl md:text-2xl lg:text-3xl">Our Mission</h2>
            <div className="w-16 md:w-20 h-1 bg-indigo-500 mx-auto mt-2 mb-4 md:mb-6 rounded-full"></div>
            <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
              We believe in providing a secure and private platform for people to share their thoughts, 
              feelings, and messages without worrying about privacy concerns. Our mission is to connect 
              people through the power of anonymous communication.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="premium-title text-xl md:text-2xl lg:text-3xl">Features</h2>
            <div className="w-16 md:w-20 h-1 bg-indigo-500 mx-auto mt-2 mb-4 md:mb-6 rounded-full"></div>
            <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
              Discover the powerful features that make Secret Message the perfect platform for private communication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <FeatureCard 
              icon={FiLock} 
              title="Secure Communication" 
              description="All messages are securely stored and transmitted with the latest encryption standards."
            />
            <FeatureCard 
              icon={FiEyeOff} 
              title="Anonymous Messages" 
              description="Send messages without revealing your identity, ensuring complete privacy."
            />
            <FeatureCard 
              icon={FiMessageSquare} 
              title="Customizable Links" 
              description="Create personalized links to share with friends, family, or on social media."
            />
            <FeatureCard 
              icon={FiEye} 
              title="Private Dashboard" 
              description="View all received messages in a clean, organized private dashboard."
            />
            <FeatureCard 
              icon={FiShield} 
              title="Data Protection" 
              description="Your data is protected with the highest security standards and privacy controls."
            />
            <FeatureCard 
              icon={FiHeart} 
              title="Beautiful Design" 
              description="Enjoy a premium user experience with our modern, responsive design."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="premium-title text-xl md:text-2xl lg:text-3xl">How It Works</h2>
            <div className="w-16 md:w-20 h-1 bg-indigo-500 mx-auto mt-2 mb-4 md:mb-6 rounded-full"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line - hidden on mobile, visible on larger screens */}
              <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-indigo-100 hidden md:block"></div>
              
              {/* Timeline items - stacked on mobile, side-by-side on larger screens */}
              <div className="space-y-8 md:space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 md:text-right order-2 md:order-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">Create Your Link</h3>
                    <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Generate a unique link that will collect your secret messages.</p>
                  </div>
                  <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm md:text-base order-1 md:order-2 mb-3 md:mb-0">1</div>
                  <div className="md:w-1/2 md:pl-8 hidden md:block order-3"></div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 hidden md:block order-1"></div>
                  <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm md:text-base order-1 md:order-2 mb-3 md:mb-0">2</div>
                  <div className="md:w-1/2 md:pl-8 order-2 md:order-3">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">Share Your Link</h3>
                    <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Share your unique link with friends or on social media.</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 md:text-right order-2 md:order-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">Receive Secret Messages</h3>
                    <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">People can anonymously send you messages through your link.</p>
                  </div>
                  <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm md:text-base order-1 md:order-2 mb-3 md:mb-0">3</div>
                  <div className="md:w-1/2 md:pl-8 hidden md:block order-3"></div>
                </div>
                
                {/* Step 4 */}
                <div className="relative flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8 hidden md:block order-1"></div>
                  <div className="z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm md:text-base order-1 md:order-2 mb-3 md:mb-0">4</div>
                  <div className="md:w-1/2 md:pl-8 order-2 md:order-3">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">Read Your Messages</h3>
                    <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Check your private dashboard to read all the messages you've received.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="premium-title text-xl md:text-2xl lg:text-3xl">Our Team</h2>
            <div className="w-16 md:w-20 h-1 bg-indigo-500 mx-auto mt-2 mb-4 md:mb-6 rounded-full"></div>
            <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
              Meet the passionate team behind Secret Message.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <TeamMember 
                name="Sachin Mahapatra" 
                role="Founder & Developer" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="premium-title text-xl md:text-2xl lg:text-3xl">Get In Touch</h2>
          <div className="w-16 md:w-20 h-1 bg-indigo-500 mx-auto mt-2 mb-4 md:mb-6 rounded-full"></div>
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto mb-6 md:mb-8">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <a 
            href="https://github.com/SachinnMahapatra" 
            target="_blank"
            rel="noopener noreferrer"
            className="premium-btn premium-btn-primary flex items-center justify-center mx-auto"
          >
            <FiGithub className="mr-2" /> Contact on GitHub
          </a>
        </div>
      </section>
    </div>
  );
};

export default About; 