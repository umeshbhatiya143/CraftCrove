import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-gray-800 text-white">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center">
            <img src="/logo.png" alt="logo" className="w-12 h-12 text-white p-2 bg-indigo-500 rounded-full" />
            <span className="ml-3 text-xl text-white">CraftCrove</span>
          </a>
          <p className="mt-2 text-sm text-gray-400">Wear the code &lt;/code&gt; with pride.</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {/* Dynamic section for links could be mapped from a list */}
          {["CATEGORIES", "INFORMATION", "COMPANY", "SUPPORT"].map((section, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">{section}</h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-gray-200">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-200">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-200">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-gray-200">Fourth Link</a>
                </li>
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-700 bg-opacity-75">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-400 text-sm text-center sm:text-left">© 2024 CraftCrove —
            <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@CraftCrove</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social, index) => (
              <a key={index} className="text-gray-400 hover:text-gray-200 ml-3">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox={`0 0 24 24`}>
                  {/* Icon paths for different social media */}
                </svg>
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
