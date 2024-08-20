import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = ({ currency }) => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  const convertPrice = (priceInUSD) => {
    const rates = {
      USD: 1,
      GBP: 0.75,
      EUR: 0.85,
      BTC: 0.000021,
      ETH: 0.00031,
      ICP: 0.035,
    };

    return (priceInUSD * rates[currency]).toFixed(2);
  };

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} convertPrice={convertPrice} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
