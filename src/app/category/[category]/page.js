'use client';

import { useEffect, useState, use } from 'react';
import styles from './category.module.css';

export default function CategoryPage(props) {
  const params = use(props.params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/category/${params.category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.category]);

 if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-700"></div>
        <p className="mt-2 text-gray-600">กำลังโหลด...</p>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className={styles.categoryTitle}>
        สินค้าในหมวดหมู่ {params.category}
      </h1>
      
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>
                {product.title}
              </h3>
              <p className={styles.productDescription}>
                {product.description}
              </p>
              <div className={styles.productBottom}>
                <p className={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </p>
                <button className={styles.detailsButton}>
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
