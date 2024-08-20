import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

// Create the context
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

// Currency conversion rates (mock values for demonstration)
const conversionRates = {
    USD: 1,
    EUR: 0.91, // Example conversion rate
    GBP: 0.76, // Example conversion rate
    BTC: 0.000021, // Example conversion rate
    ETH: 0.00034, // Example conversion rate
    ICP: 0.92, // Example conversion rate
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [currency, setCurrency] = useState('USD'); // Default currency
    const [currencySymbol, setCurrencySymbol] = useState('$'); // Default symbol

    // Currency Symbols Map
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        BTC: '₿',
        ETH: 'Ξ',
        ICP: 'Ξ', // Placeholder for ICP, adjust as needed
    };

    // Convert price based on selected currency
    const convertPrice = (price, targetCurrency) => {
        const rate = conversionRates[targetCurrency] || 1;
        return price * rate;
    };

    // Handle currency change
    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;
        setCurrency(newCurrency);
        setCurrencySymbol(currencySymbols[newCurrency]);
    };

    // Add item to cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * convertPrice(itemInfo.new_price, currency);
            }
        }
        return totalAmount;
    };

    // Get total cart items
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        currency,
        currencySymbol,
        handleCurrencyChange,
        convertPrice,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
