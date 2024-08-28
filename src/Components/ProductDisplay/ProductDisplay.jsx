import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  // Ensure default values to prevent rendering errors
  const price = product.price !== undefined ? product.price.toFixed(2) : "0.00";
  const oldPrice = product.oldPrice !== undefined ? product.oldPrice.toFixed(2) : null;

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {/* Show multiple images if available */}
          {product.productImages && product.productImages.map((img, index) => (
            <img key={index} src={img} alt={`Product view ${index + 1}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.productImage} alt="Product" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.productName}</h1>
        <div className="productdisplay-right-stars">
          {/* Assuming a static rating for now; could be dynamic based on product ratings */}
          <img src={star_icon} alt="Star icon" />
          <img src={star_icon} alt="Star icon" />
          <img src={star_icon} alt="Star icon" />
          <img src={star_icon} alt="Star icon" />
          <img src={star_dull_icon} alt="Dull star icon" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          {oldPrice && (
            <div className="productdisplay-right-price-old">
              ${oldPrice}
            </div>
          )}
          <div className="productdisplay-right-price-new">
            ${price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.longDescription}
        </div>
        <div className="productdisplay-right-details">
          <p><span>Inventory:</span> {product.inventory}</p>
          <p><span>Date Added:</span> {product.dateAdded}</p>
          <p><span>Seller:</span> {product.sellerName}</p>
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {/* Placeholder sizes; could be dynamic based on product data */}
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span> {product.category}</p>
        <p className='productdisplay-right-category'><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
