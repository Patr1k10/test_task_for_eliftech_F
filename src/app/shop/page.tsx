'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/shopStyles.module.css';
import {Shop} from "@/type/shop";
import {Drug} from "@/type/drug";


const Shop = () => {

  const [shops, setShops] = useState<Shop[]>([]); // Явно указываем тип массива магазинов
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null); // Явно указываем тип для selectedShop


  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://3.67.97.66:3001/shop');
        const data = await response.json();
        setShops(data.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  const handleShopSelect = (shop: Shop) => {
    // @ts-ignore
    setSelectedShop(shop);
  };
  const handleAddToCart = (drugs: Drug) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    let updatedCartItems = [...existingCartItems];
    const existingItemIndex = existingCartItems.findIndex((item: { name: string; }) => item.name === drugs.name);
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      updatedCartItems = [...existingCartItems, { ...drugs, quantity: 1 }];
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };


  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (

      <div className={styles.shopContainer}>
  {/* Shops section */}
      <div className={styles.shopsSection}>
        <h2 className={styles.shopTitle}>Pharmacy</h2>
        <ul>
          {shops.map((shop: Shop) => (
            <li
              key={shop.id}
              className={styles.shopItem}
              onClick={() => handleShopSelect(shop)}
            >
              {shop.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Products section */}
      <div className={styles.productsSection}>
        {selectedShop && selectedShop.drugs && (
          <div className={styles.productsGrid}>
            {selectedShop.drugs.map((drug: Drug) => (
              <div key={drug.id} className={styles.productItem}>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{drug.name}</h3>
                  <p className={styles.productPrice}>Price: {drug.price} UAH.</p>
                </div>
                <button className={styles.addToCartBtn} onClick={() => handleAddToCart(drug)}>In cart</button>

              </div>
            ))}
          </div>
        )}
      </div>
      </div>

  );
};

export default Shop;





