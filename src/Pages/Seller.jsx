import React, { useState } from 'react';
import './CSS/Seller.css';

const SellerMode = () => {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleImageUpload = (event) => {
    setProductImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      productName,
      shortDescription,
      price,
      productImage,
      dateUploaded: new Date().toLocaleDateString(),
    };

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    // Reset form
    setProductImage(null);
    setProductName('');
    setShortDescription('');
    setPrice('');
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setProductName(productToEdit.productName);
    setShortDescription(productToEdit.shortDescription);
    setPrice(productToEdit.price);
    setProductImage(productToEdit.productImage);
    setEditIndex(index);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className='sellermode'>
      <h1>Seller Mode</h1>

      <form className='sellermode-form' onSubmit={handleFormSubmit}>
        <div className='sellermode-row'>
          <label htmlFor='productImage'>Product Image</label>
          <input type='file' id='productImage' onChange={handleImageUpload} />
          {productImage && <img src={productImage} alt='Product Preview' className='sellermode-image-preview' />}
        </div>
        <div className='sellermode-row'>
          <label htmlFor='productName'>Product Name</label>
          <input
            type='text'
            id='productName'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder='Enter product name'
          />
        </div>
        <div className='sellermode-row'>
          <label htmlFor='shortDescription'>Short Description</label>
          <textarea
            id='shortDescription'
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder='Enter short description'
            rows='2'
          />
        </div>
        <div className='sellermode-row'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter price'
          />
        </div>
        <button type='submit' className='sellermode-submit-btn'>
          {editIndex !== null ? 'Update Product' : 'Submit Product'}
        </button>
      </form>
<form>
      <div className='sellermode-product-list'>
        <h2>Uploaded Products</h2>
        <table className='sellermode-product-table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td><img src={product.productImage} alt='Product Thumbnail' className='sellermode-product-thumbnail' /></td>
                  <td>{product.productName}</td>
                  <td>{product.shortDescription}</td>
                  <td>${product.price}</td>
                  <td>{product.dateUploaded}</td>
                  <td>
                    <button onClick={() => handleEditProduct(index)} className='sellermode-edit-btn'>Edit</button>
                    <button onClick={() => handleRemoveProduct(index)} className='sellermode-remove-btn'>Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6'>No products uploaded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </form>
    </div>
    
  );
};

export default SellerMode;
