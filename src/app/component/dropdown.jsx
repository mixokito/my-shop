import React, { useState } from 'react';
import styles from './dropdown.module.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    'อิเล็กทรอนิกส์',
    'เสื้อผ้า',
    'อุปกรณ์ทั่วไป',
    'เครื่องประดับ',
    
  ];

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
          {categories.map((category, index) => (
            <a key={index} href={`/category/${category}`} className={styles.dropdownItem}>
              {category}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;