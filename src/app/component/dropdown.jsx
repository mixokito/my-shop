import React, { useState, useEffect } from 'react';
import styles from './dropdown.module.css';
import { useRouter } from 'next/navigation';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/products/categories');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (path) => {
    router.push(`/category/${path}`);
    setIsOpen(false);
  };

  return (
    <div 
      className={styles.dropdown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={styles.dropdownButton}>
        หมวดหมู่สินค้า
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.arrow}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.path)}
              className={styles.dropdownItem}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;