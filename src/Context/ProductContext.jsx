import React, { createContext, useState, useEffect } from 'react';
import { getProducts } from '../ic/productService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        setProductError(error);
      } finally {
        setLoadingProducts(false);
      }
      
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ allProducts, loadingProducts, productError }}>
      {children}
    </ProductContext.Provider>
  );
};
