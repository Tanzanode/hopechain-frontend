import React, { useContext } from 'react';
import './Popular.css';
import { ProductContext } from '../../Context/ProductContext';
import Item from '../Item/Item';

const Popular = () => {
  const { allProducts, loadingProducts, productError } = useContext(ProductContext);

  if (loadingProducts) {
    return <div className='product-loading'>Loading...</div>;
  }

  if (productError) {
    return <div>Error loading products: {productError.message}</div>;
  }

  // Filter products to only include those with category "TE" and limit to 4 products
  const filteredProducts = allProducts
    .filter(product => product.category === 'TE')
    .slice(0, 4);

  return (
    <div className='popular'>
      <h1>POPULAR IN TEXTILES</h1>
      <hr />
      <div className="popular-item">
        {filteredProducts.map((item, i) => (
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

export default Popular;
