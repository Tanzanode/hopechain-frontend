import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import './CSS/Product.css';

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();

  console.log("Product ID from URL: ", productId);
  console.log('Type of productId:', typeof productId);

  if (!allProducts) {
    return <div>Loading...</div>;
  }

  // Debugging log to inspect allProducts
  console.log('allProducts:', allProducts);
  console.log('Types of IDs in allProducts:', allProducts.map(product => typeof product.id));

  // Convert productId to bigint for comparison
  const productIdBigInt = BigInt(productId);

  // Ensure consistent type comparison
  const product = allProducts.find((e) => {
    console.log(`Comparing ${e.id} with ${productIdBigInt}`);
    return e.id === productIdBigInt;
  });
  console.log("Found Product: ", product);

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
