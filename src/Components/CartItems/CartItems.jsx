import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { deposit, getTotalCharityAmount } from '../../ic/productService';
import Popup from './Popup'; // Import the Popup component
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { allProducts = [], cartItems, removeFromCart, currency, convertPrice, resetCart } = useContext(ShopContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('USD');
  const [convertedTotal, setConvertedTotal] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [charityAmount, setCharityAmount] = useState(0);
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('user')); // Check if the user is authenticated

  const conversionRates = useMemo(() => ({
    USD: 1,
    GBP: 0.79,
    EUR: 0.88,
    ICP: 7.14,
    ETH: 0.00062,
    BTC: 0.000025
  }), []);

  useEffect(() => {
    const fetchCharityAmount = async () => {
      try {
        const amountInIcp = await getTotalCharityAmount();
        setCharityAmount(amountInIcp);
      } catch (error) {
        console.error("Error fetching charity amount:", error);
      }
    };

    fetchCharityAmount();
  }, []);

  const calculateTotalCartAmount = useCallback(() => {
    let total = 0;
    allProducts.forEach((product) => {
      if (cartItems[product.id] > 0 && product.price) {
        total += convertPrice(product.price, selectedPaymentMethod) * cartItems[product.id];
      }
    });
    return total;
  }, [allProducts, cartItems, convertPrice, selectedPaymentMethod]);

  useEffect(() => {
    const totalInSelectedCurrency = calculateTotalCartAmount();
    setConvertedTotal(totalInSelectedCurrency);
  }, [selectedPaymentMethod, allProducts, cartItems, conversionRates, calculateTotalCartAmount]);

  const calculateTotalFund = () => {
    let totalFund = 0;
    allProducts.forEach((product) => {
      if (cartItems[product.id] > 0 && product.price) {
        totalFund += (convertPrice(product.price, selectedPaymentMethod) * cartItems[product.id]) * 0.1;
      }
    });
    return totalFund.toFixed(2);
  };

  const handleProceedToPurchase = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const totalFund = calculateTotalFund();

    try {
      await deposit(convertedTotal, selectedPaymentMethod); 
      setPopupMessage(`Transaction complete! You’ve donated $${totalFund} to The Charity Group!\nYour support makes a difference. Thank you!`);
      resetCart(); // Reset the cart after purchase
      setShowPopup(true);
    } catch (error) {
      setPopupMessage('There was an issue during the purchase. Please try again.');
      setShowPopup(true);
      console.error('Error during purchase:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const isCartEmpty = allProducts.every(product => cartItems[product.id] === 0);

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
      {isCartEmpty ? (
        <p>No items in the cart.</p>
      ) : (
        allProducts.map((product) => {
          if (cartItems[product.id] > 0) {
            const itemTotal = convertPrice(product.price, selectedPaymentMethod) * cartItems[product.id];
            return (
              <div key={product.id}>
                <div className="cartitems-format cartitems-format-main">
                  <img src={product.productImage} alt="" className='carticon-product-icon' />
                  <p>{product.productName}</p>
                  <p>{currency} {convertPrice(product.price, selectedPaymentMethod).toFixed(2)}</p>
                  <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                  <p>{currency} {itemTotal.toFixed(2)}</p>
                  <p>{currency} {(itemTotal * 0.1).toFixed(2)}</p>
                  <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(product.id)} alt="" />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })
      )}
      {!isCartEmpty && (
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>{convertedTotal.toFixed(2)} {selectedPaymentMethod}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>{convertedTotal.toFixed(2)} {selectedPaymentMethod}</h3>
              </div>
            </div>
            <div className="cartitems-payment-method">
              <p>Select Payment Method:</p>
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
            <p>Charity Account Amount ({selectedPaymentMethod})</p>
            <div className="cartitems-promobox">
              <span>
                {selectedPaymentMethod === "ICP"
                  ? `${charityAmount.toFixed(2)} ICP`
                  : `${(charityAmount / conversionRates["ICP"] * conversionRates[selectedPaymentMethod]).toFixed(2)} ${selectedPaymentMethod}`}
              </span>
            </div>
          </div>
        </div>
      )}
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default CartItems;
