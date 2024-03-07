'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../app/styles/header.module.css';

interface HeaderProps {
  pageTitle: string ; // Принимаем заголовок страницы в качестве пропа
}

const Header: React.FC = () => {

  return (
    <header className={styles.header}>
      <h1>{'Pharmacy '}</h1> {/* Отображаем переданный заголовок страницы */}
      <nav>
        <Link href="/shop">
          <span className={styles.navLink}>Shop</span>
        </Link>
        <Link href="/shoppingcart">
          <span className={styles.navLink}>ShopPing Cart</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

