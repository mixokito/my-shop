'use client';
import { useEffect, useState } from 'react';

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
