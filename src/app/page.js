'use client';
import { useEffect, useState } from 'react';

// 🔹 หน้าแสดงสินค้า
export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Moki Shop | หน้าแรก';
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-700"></div>
        <p className="mt-2 text-gray-600">กำลังโหลด...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-red-600">
        <p>เกิดข้อผิดพลาด: {error}</p>
      </div>
    </div>
  );

  return (
    <div>
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
              <p className="text-gray-700 font-bold mt-2">${product.price.toFixed(2)}</p>
              <button className="mt-3 w-full bg-gray-700 text-white py-1.5 rounded hover:bg-black">
                ดูรายละเอียด
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
