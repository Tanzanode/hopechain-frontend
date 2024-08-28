import React, { useContext } from 'react';
import './NewCollections.css';
import { ProductContext } from '../../Context/ProductContext';
import Item from '../Item/Item';

const NewCollections = () => {
  const { allProducts, loadingProducts, productError } = useContext(ProductContext);

  if (loadingProducts) {
    return <div className='product-loading'>Loading...</div>;
  }

  if (productError) {
    return <div>Error loading products: {productError.message}</div>;
  }

  // Sort products by the date added in descending order
  const sortedProducts = allProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

  // Get the 8 most recent products
  const recentProducts = sortedProducts.slice(0, 8);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {recentProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            productName={item.productName}
            image={item.productImage}
            price={item.price}
            currency={item.currency}
            shortDescription={item.shortDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
