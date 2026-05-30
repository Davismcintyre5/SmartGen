import React from 'react';

const Footer = () => (
  <footer className="bg-ink text-gray-400 text-sm mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <p className="font-bold text-white mb-1"><span className="text-amber-400">✨</span> SmartGen</p>
      <p>AI-Powered Document Generation</p>
      <p className="text-xs mt-4 text-gray-500">© {new Date().getFullYear()} SmartGen. Powered by HDM Developers.</p>
    </div>
  </footer>
);

export default Footer;