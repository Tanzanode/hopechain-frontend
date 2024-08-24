import React, { useState, useContext } from 'react';
import { deposit } from '../../ic/productService';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import './CartItems.css';
import Popup from './Popup';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, resetCart } = useContext(ShopContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('USD');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Function to calculate 10% of the total cart amount
  const calculateTotalFund = () => {
    let totalFund = 0;
    all_product.forEach((product) => {
      if (cartItems[product.id] > 0) {
        totalFund += (product.new_price * cartItems[product.id]) * 0.1;
      }
    });
    return totalFund.toFixed(2);
  };

  const handleProceedToPurchase = async () => {
    const totalCartAmount = getTotalCartAmount();
    const totalFund = calculateTotalFund();
  
    console.log('Total Cart Amount:', totalCartAmount);
    console.log('Selected Payment Method:', selectedPaymentMethod);
  
    try {
      // Pass both amount and currency to the deposit function
      await deposit(totalCartAmount, selectedPaymentMethod);
      setPopupMessage(`Transaction complete! You’ve donated $${totalFund} to The Charity Group!\nYour support makes a difference. Thank you!`);
      setShowPopup(true);
      
      // Reset the cart after a successful purchase
      resetCart();
    } catch (error) {
      setPopupMessage('There was an issue during the purchase. Please try again.');
      setShowPopup(true);
      console.error('Error during purchase:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Total Fund</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                <p>${(e.new_price * cartItems[e.id] * 0.1).toFixed(2)}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>
          <div className="cartitems-payment-method">
            <p>Choose Payment Currency:</p>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">Euro</option>
              <option value="ICP">ICP</option>
              <option value="ETH">Ether</option>
              <option value="BTC">Bitcoin</option>
            </select>
          </div>
          <button onClick={handleProceedToPurchase}>PROCEED TO PURCHASE</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>

      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default CartItems;
