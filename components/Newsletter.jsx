import React from 'react';

const Newsletter = () => {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-300 opacity-40"></div>

      <div className="container mx-auto px-4">
        {/* Newsletter Card */}
        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-md mx-auto relative transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          {/* Glow effect behind the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-30 blur-lg rounded-3xl -z-10"></div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
            Subscribe to Our Newsletter
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Get the latest updates, special offers, and exclusive deals directly in your inbox.
          </p>

          {/* Input and Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-gray-800 rounded-full shadow-lg focus:ring-4 focus:ring-purple-400 focus:outline-none"
              style={{ 
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' 
              }}
            />

            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold transition transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400"
              style={{ 
                boxShadow: '0px 4px 20px rgba(93, 12, 255, 0.4)' 
              }}
            >
              Subscribe
            </button>
          </div>

          {/* Subtle glowing dots for added effect */}
          <div className="absolute top-1/2 left-5 w-3 h-3 bg-pink-500 rounded-full blur-lg opacity-70 animate-pulse"></div>
          <div className="absolute bottom-3 right-6 w-4 h-4 bg-blue-400 rounded-full blur-md opacity-80 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
