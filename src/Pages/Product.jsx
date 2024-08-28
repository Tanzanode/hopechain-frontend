import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import './CSS/Product.css';

const Product = () => {
  const { allProducts } = useContext(ShopContext); // Align with context value
  const { id } = useParams();

  // Check if allProducts is defined and find the product
  if (!allProducts) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  const product = allProducts.find((e) => e.id === Number(id));

  if (!product) {
    return <div className='product-not-found'>Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts productId={product.id} />
    </div>
  );
};

export default Product;
