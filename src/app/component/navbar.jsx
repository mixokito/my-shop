'use client';

import { useState } from 'react';
import Dropdown from './dropdown';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* โลโก้ */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🛍️</span>
          <h1 className="text-xl font-bold">Moki Shop</h1>
        </Link>

        {/* เมนูปกติ (desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-gray-300">หน้าแรก</Link>
          <Dropdown />
          <Link href="https://www.youtube.com/watch?v=xvFZjo5PgG0" className="hover:text-gray-300">ติดต่อเรา</Link>
        </div>

        {/* ปุ่ม 3 ขีด (mobile) */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              // ปุ่ม X
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // ปุ่ม 3 ขีด
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* เมนูมือถือ */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700 px-4 pb-3 space-y-2 text-sm">
          <Link href="/" className="block py-1 border-b border-gray-600 hover:text-blue-300">หน้าแรก</Link>
          <div className="py-1 border-b border-gray-600">
            <Dropdown />
          </div>
          <Link href="#" className="block py-1 hover:text-blue-300">ติดต่อเรา</Link>
        </div>
      )}
    </nav>
  );
}