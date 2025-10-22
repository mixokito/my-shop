'use client';
import { useEffect, useState } from 'react';
import Dropdown from './component/dropdown';

// 🔹 Navbar component
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* โลโก้ */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🛍️</span>
          <h1 className="text-xl font-bold">Moki Shop</h1>
        </div>

        {/* เมนูปกติ (desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="" className="hover:text-gray-300">หน้าแรก</a>
          <Dropdown />
          <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" className="hover:text-gray-300">ติดต่อเรา</a>
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
          <a href="" className="block py-1 border-b border-gray-600 hover:text-blue-300">หน้าแรก</a>
          <div className="py-1 border-b border-gray-600">
            <Dropdown />
          </div>
          <a href="#" className="block py-1 hover:text-blue-300">ติดต่อเรา</a>
        </div>
      )}
    </nav>
  );
}

// 🔹 หน้าแสดงสินค้า
export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = 'Moki Shop | หน้าแรก';
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">รายการสินค้า</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain p-4 bg-gray-100"
              />
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-700 truncate">{product.title}</h3>
                <p className="text-gray-700 font-bold mt-2">${product.price}</p>
                <button className="mt-3 w-full bg-gray-700 text-white py-1.5 rounded hover:bg-black">
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
