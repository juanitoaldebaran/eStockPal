"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold mb-4">eStockPal</h2>
          <p className="text-sm text-white">
            Invest in your future with our secure and innovative online finance platform.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/market" className="hover:underline">Market</Link></li>
            <li><Link href="/community" className="hover:underline">Community</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://twitter.com" target="_blank" className="hover:text-blue-300 transition-colors duration-200">
              <i className="fab fa-twitter"></i> Twitter
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-300 transition-colors duration-200">
              <i className="fab fa-linkedin"></i> LinkedIn
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-black-500 mt-8 pt-6 text-center text-white text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-white">eStockPal</span>. All rights reserved.
      </div>
    </footer>
  );
}
