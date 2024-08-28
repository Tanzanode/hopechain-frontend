import React, { createContext, useState, useContext, useEffect } from "react";
import { ProductContext } from "./ProductContext";

// Create the context
export const ShopContext = createContext(null);

const getDefaultCart = (allProducts) => {
    let cart = {};
    for (let index = 0; index < allProducts.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

// Currency conversion rates (mock values for demonstration)
const conversionRates = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.76,
    BTC: 0.000021,
    ETH: 0.00034,
    ICP: 0.92,
};

const ShopContextProvider = (props) => {
    const { allProducts } = useContext(ProductContext); // Access allProducts from ProductContext
    const [cartItems, setCartItems] = useState({});
    const [currency, setCurrency] = useState('USD');
    const [currencySymbol, setCurrencySymbol] = useState('$');

    useEffect(() => {
        if (allProducts) {
            setCartItems(getDefaultCart(allProducts));
        }
    }, [allProducts]);

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

    // Reset cart after purchase
    const resetCart = () => {
        setCartItems(getDefaultCart(allProducts));
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find((product) => product.id === Number(item));
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
        allProducts,
        cartItems,
        addToCart,
        removeFromCart,
        resetCart,
        currency,
        currencySymbol,
        handleCurrencyChange,
        convertPrice,
    };

    if (!allProducts) {
        return <div>Loading...</div>; // Optionally handle loading state
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
