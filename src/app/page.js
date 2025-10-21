'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงข้อมูลสินค้าจาก API ที่เราสร้างไว้
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('ไม่สามารถโหลดข้อมูลได้');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">⏳ กำลังโหลดสินค้า...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">🛍️ Moki Shop</h1>
          <div className="space-x-4">
            <a href="#" className="hover:underline">หน้าแรก</a>
            <a href="#" className="hover:underline">หมวดหมู่สินค้า</a>
            <a href="#" className="hover:underline">ติดต่อเรา</a>
          </div>
        </div>
      </nav>

      {/* รายการสินค้า */}
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
                <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                <button className="mt-3 w-full bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600">
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