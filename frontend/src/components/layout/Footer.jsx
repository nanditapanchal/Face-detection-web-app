import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 px-4 shadow-inner mt-8">
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">Face Detection App By Nandita Panchal</span>. All rights reserved.
      </p>
      <div className="mt-2 space-x-4">
        <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
          Privacy
        </a>
        <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
          Terms
        </a>
      </div>
    </footer>
  );
}
