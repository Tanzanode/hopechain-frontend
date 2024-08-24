import React, { useState, useContext, useEffect } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { deposit, getTotalCharityAmount } from '../../ic/productService';
import Popup from './Popup'; // Import the Popup component

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('USD');
  const [convertedTotal, setConvertedTotal] = useState(0);
  const [conversionRate, setConversionRate] = useState(1); // Start with 1, which is equivalent to USD
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [charityAmount, setCharityAmount] = useState(0); // Add state for charity amount

  // Mock conversion rates (should be updated with real API data)
  const conversionRates = {
    USD: 1,       // Base currency
    GBP: 0.79,    // Example: 1 USD = 0.79 GBP
    EUR: 0.88,    // Example: 1 USD = 0.88 EUR
    ICP: 7.14,    // Example: 1 USD = 7.14 ICP
    ETH: 0.00062, // Example: 1 USD = 0.00062 ETH
    BTC: 0.000025 // Example: 1 USD = 0.000025 BTC
  };

  useEffect(() => {
    const fetchCharityAmount = async () => {
      try {
        const amountInIcp = await getTotalCharityAmount();
        setCharityAmount(amountInIcp);
      } catch (error) {
        console.error("Error fetching charity amount:", error);
      }
    };

    fetchCharityAmount(); // Fetch the charity amount on component mount
  }, []);

  // Update the conversion rate and converted total when the payment method or cart amount changes
  useEffect(() => {
    const newConversionRate = conversionRates[selectedPaymentMethod] || 1;
    setConversionRate(newConversionRate);

    const totalInSelectedCurrency = getTotalCartAmount() * newConversionRate;
    setConvertedTotal(totalInSelectedCurrency);
  }, [selectedPaymentMethod, getTotalCartAmount]);

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
    const totalFund = calculateTotalFund();

    console.log('Total Cart Amount:', convertedTotal);
    console.log('Selected Payment Method:', selectedPaymentMethod);

    try {
      await deposit(convertedTotal, selectedPaymentMethod); 
      setPopupMessage(`Transaction complete! You’ve donated $${totalFund} to The Charity Group!\nYour support makes a difference. Thank you!`);
      setShowPopup(true);
      // Reset cart items after purchase
      Object.keys(cartItems).forEach(productId => removeFromCart(productId));
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
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
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
            <p>
              {selectedPaymentMethod === "ICP"
                ? `${charityAmount.toFixed(2)} ICP`
                : `${(charityAmount / conversionRates["ICP"] * conversionRates[selectedPaymentMethod]).toFixed(2)} ${selectedPaymentMethod}`}
            </p>
          </div>
        </div>
      </div>

      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default CartItems;
