import React, { useState, useEffect } from 'react';
import { addProduct, getProductsBySeller } from '../ic/productService';
import './CSS/Seller.css';

const SellerMode = ({ userName }) => {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('ICP');
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState('');
  const [dateAdded, setDateAdded] = useState(new Date().toISOString().split('T')[0]); // Default to current date
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [shortDescCharCount, setShortDescCharCount] = useState(250);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result);  // Set base64 data URL for preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch products by seller when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsBySeller(userName);
        setProducts(fetchedProducts);
      } catch (error) {
        setErrorMessage('Failed to fetch products. Please try again.');
      }
    };
    fetchProducts();
  }, [userName]);

  const handleShortDescriptionChange = (event) => {
    const value = event.target.value;
    if (value.length <= 250) {
      setShortDescription(value);
      setShortDescCharCount(250 - value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Validate form fields
    if (!productName || !price || !inventory) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (shortDescription.length > 250) {
      setErrorMessage('Short description exceeds the maximum allowed length of 250 characters.');
      return;
    }

    const newProduct = {
      sellerName: userName,
      productName,
      shortDescription,
      longDescription,
      price,
      currency,
      category,
      productImage,
      inventory,
      dateAdded,
    };

    try {
      // Add the product to the backend
      await addProduct(newProduct);

      // Update local state (optional if you want to display it immediately)
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
      setLongDescription('');
      setPrice('');
      setCurrency('ICP');
      setCategory('DE');
      setInventory('');
      setDateAdded(new Date().toISOString().split('T')[0]);
      setShortDescCharCount(250);

      // Set success message
      setSuccessMessage('Product added successfully!');
    } catch (error) {
      setErrorMessage('Failed to add product. Please try again.');
    }
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setProductName(productToEdit.productName);
    setShortDescription(productToEdit.shortDescription);
    setLongDescription(productToEdit.longDescription);
    setPrice(productToEdit.price);
    setCurrency(productToEdit.currency);
    setCurrency(productToEdit.category);
    setProductImage(productToEdit.productImage);
    setInventory(productToEdit.inventory);
    setDateAdded(productToEdit.dateAdded);
    setEditIndex(index);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Function to check if inventory is low
  const isLowInventory = (inventory) => {
    return inventory < 10;
  };

  // Calculate products to display based on current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle pagination controls
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className='sellermode'>
      <h2>Register Product</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className='sellermode-form' onSubmit={handleFormSubmit}>
        <div className='sellermode-row'>
          <label htmlFor='productImage'>Product Image</label>
          <input type='file' id='productImage' onChange={handleImageUpload} />
          {productImage && <img src={productImage} alt='Product Preview' className='sellermode-image-preview' />}
        </div>
        <div className='sellermode-row'>
          <label htmlFor='productName'>Product Name <span className="required">*</span></label>
          <input
            type='text'
            id='productName'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder='Enter product name'
            required
          />
        </div>
        <div className='sellermode-row'>
          <label htmlFor='shortDescription'>Short Description <span className="required">*</span></label>
          <textarea
            id='shortDescription'
            value={shortDescription}
            onChange={handleShortDescriptionChange}
            placeholder='Enter short description (max 250 characters)'
            rows='2'
            required
          />
          <small>{shortDescCharCount} characters remaining</small>
        </div>
        <div className='sellermode-row'>
          <label htmlFor='longDescription'>Long Description</label>
          <textarea
            id='longDescription'
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder='Enter detailed description'
            rows='5'
          />
        </div>
        <div className='sellermode-row inline'>
          <div className='inline-item'>
            <label htmlFor='price'>Price <span className="required">*</span></label>
            <input
              type='number'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Enter price'
              required
            />
          </div>
          <div className='inline-item'>
            <label htmlFor='currency'>Currency</label>
            <select id='currency' value={currency} required onChange={(e) => setCurrency(e.target.value)}>
              <option value='ICP'>ICP</option>
              <option value='BTC'>BTC</option>
              <option value='ETH'>ETH</option>
              <option value='USD'>USD</option>
              <option value='GBP'>GBP</option>
              <option value='EUR'>EUR</option>
            </select>
          </div>
        </div>
        <div className='sellermode-row'>
          <label htmlFor='inventory'>Inventory <span className="required">*</span></label>
          <input
            type='number'
            id='inventory'
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            placeholder='Enter available stock'
            required
          />
        </div>
        <div className='sellermode-row'>
            <label htmlFor='category'>Category</label>
            <select id='category' value={category} required onChange={(e) => setCategory(e.target.value)}>
              <option value='DE'>Designs</option>
              <option value='TE'>Textiles</option>
              <option value='KI'>Kitchenware</option>
            </select>
          </div>
        <div className='sellermode-row'>
          <label htmlFor='dateAdded'>Date Added</label>
          <input
            type='date'
            id='dateAdded'
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='sellermode-submit-btn'>
          {editIndex !== null ? 'Update Product' : 'Submit Product'}
        </button>
      </form>

      <div className='sellermode-product-list'>
        <h2>Uploaded Products</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <table className='sellermode-product-table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Short Description</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Category</th>
              <th>Inventory</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index}>
                <td><img src={product.productImage} alt={product.productName} className='product-image-thumbnail' /></td>
                <td>{product.productName}</td>
                <td>{product.shortDescription}</td>
                <td>{product.price}</td>
                <td>{product.currency}</td>
                <td>{product.category}</td>
                <td>
                  {product.inventory.toString()}
                  {isLowInventory(product.inventory) && (
                    <span className="low-inventory-alert">!</span>
                  )}
                </td>
                <td>{product.dateAdded}</td>
                <td>
                  <button onClick={() => handleEditProduct(index)}>Edit</button>
                  <button onClick={() => handleRemoveProduct(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map(pageNumber => (
            <button
              key={pageNumber + 1}
              onClick={() => handlePageChange(pageNumber + 1)}
              className={pageNumber + 1 === currentPage ? 'active' : ''}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerMode;
