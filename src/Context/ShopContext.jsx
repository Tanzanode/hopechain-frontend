import React, { createContext, useState, useContext, useEffect } from "react";
import { ProductContext } from "./ProductContext";

// Create the context
export const ShopContext = createContext(null);

const getDefaultCart = (allProducts) => {
    let cart = {};
    for (let index = 0; index < allProducts.length; index++) {
        cart[allProducts[index].id] = 0; // Use product ID to index cart
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
    const { allProducts = [] } = useContext(ProductContext); // Default to empty array
    const [cartItems, setCartItems] = useState(getDefaultCart(allProducts));
    const [currency, setCurrency] = useState('USD');
    const [currencySymbol, setCurrencySymbol] = useState('$');

    useEffect(() => {
        setCartItems(getDefaultCart(allProducts));
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
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
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
                if (itemInfo && itemInfo.price) {
                    totalAmount += cartItems[item] * convertPrice(itemInfo.price, currency);
                }
            }
        }
        return totalAmount;
    };

    // Get total cart items
    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);
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

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
