import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import './CSS/Product.css';

const Product = () => {
  const { allProducts } = useContext(ShopContext); // Get products from context
  const { productId } = useParams(); // Correctly retrieve productId from URL

  if (!allProducts) {
    return <div>Loading...</div>; // Handle loading state
  }

  // Ensure consistent type comparison (string vs. number)
  const product = allProducts.find((e) => e.id === productId || e.id === Number(productId));

  if (!product) {
    return <div className='product-not-found'>Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts productId={product.id} />
    </div>
  );
};

export default Product;
