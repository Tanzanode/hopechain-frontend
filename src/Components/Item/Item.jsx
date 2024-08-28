import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, productName, image, price, currency, shortDescription }) => {
  const formattedPrice = price !== undefined && !isNaN(price) ? price.toFixed(2) : 'N/A';

  return (
    <div className='item'>
      <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={image} alt={productName} />
      </Link>
      <p className="item-name">{productName}</p>
      <p className="item-description">{shortDescription}</p>
      <div className="item-prices">
        <div className="item-price">
          {currency} {formattedPrice}
        </div>
      </div>
    </div>
  );
};

export default Item;
