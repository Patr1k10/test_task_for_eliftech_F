'use client';
import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from '../styles/shopStyles.module.css';
import axios from 'axios';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); 
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    setCartItems(items);
    calculateTotalPrice(items);
  }, []);

  const calculateTotalPrice = (items: CartItem[]) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
  };

  const handleSubmitOrder = async () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');

    // @ts-ignore
    if (!nameInput.value || !emailInput.value || !phoneInput.value || !addressInput.value || cartItems.length === 0) {
      alert('Please fill in all fields and add items to the cart before submitting the order.');
      return;
    }

    try {
      const drugs = {};
      cartItems.forEach(item => {
        // @ts-ignore
        drugs[item.id] = item.quantity;
      });

      const orderData = {
        drugs: drugs,
        // @ts-ignore

        name: nameInput.value,
        // @ts-ignore

        email: emailInput.value,
        // @ts-ignore

        phone: phoneInput.value,
        // @ts-ignore

        address: addressInput.value
      };

      const response = await axios.post('http://18.197.131.200:3001/cart', orderData);
      console.log('Order submitted successfully:', response.data);

      // @ts-ignore

      nameInput.value = '';
      // @ts-ignore

      emailInput.value = '';
      // @ts-ignore

      phoneInput.value = '';
      // @ts-ignore

      addressInput.value = '';

      localStorage.removeItem('cartItems');
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };
  // @ts-ignore

  const handleQuantityChange = (id, quantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    calculateTotalPrice(updatedItems);
  };

  return (
    <div className={styles.shopContainer}>
      <div className={styles.customerInfo}>
        <h2>Customer Information</h2>
        <form>
          <label htmlFor="name" className={styles.label}>Name:</label><br />
          <input type="text" id="name" name="name" className={styles.input} onChange={handleInputChange} /><br />
          <label htmlFor="email" className={styles.label}>Email:</label><br />
          <input type="email" id="email" name="email" className={styles.input} onChange={handleInputChange} /><br />
          <label htmlFor="phone" className={styles.label}>Phone:</label><br />
          <input type="tel" id="phone" name="phone" className={styles.input} onChange={handleInputChange} /><br />
          <label htmlFor="address" className={styles.label}>Address:</label><br />
          <textarea id="address" name="address" className={styles.textarea} onChange={handleInputChange}></textarea><br /><br />
        </form>
      </div>
      <div className={styles.productsSection}>
        <h2>Cart Items</h2>
        {cartItems.map(item => (
          <div key={item.id} className={styles.productItem}>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{item.name}</h3>
              <p className={styles.productPrice}>Price: ${item.price}</p>
              <input
                type="number"
                min="1"
                className={styles.productQuantity}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              />
            </div>
            <button className={styles.removeFromCartBtn} onClick={() => handleRemoveFromCart(item.id)}>
              Remove from Cart
            </button>
          </div>
        ))}
        <div className={styles.totalPrice}>
          <h3>Total Price: ${totalPrice}</h3>
        </div>
        <button className={styles.submitBtn} onClick={handleSubmitOrder}>
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;




