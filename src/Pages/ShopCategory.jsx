import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import { ProductContext } from '../Context/ProductContext';

const ShopCategory = ({ banner, category }) => {
  const { allProducts, loadingProducts, productError } = useContext(ProductContext);

  // Filter products based on category
  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  if (loadingProducts) {
    return <div className='product-not-found'>Loading products...</div>;
  }

  if (productError) {
    return <div>Error loading products: {productError.message}</div>;
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={banner} alt={`${category} banner`} />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort Dropdown Icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Item
              key={product.id}
              id={product.id}
              productName={product.productName}
              image={product.productImage}
              price={product.price}
              currency={product.currency}
              shortDescription={product.shortDescription}
            />
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
      {filteredProducts.length > 12 && (
        <div className="shopcategory-loadmore">
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
