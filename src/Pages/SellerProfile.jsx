import React, { useState, useEffect } from 'react';
import './CSS/Sellerprofile.css';
import { Link } from 'react-router-dom'; 
import { getTotalPrice } from '../ic/productService';

const Sellerprofile = ({ userName }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions] = useState([
    {
      id: 1,
      buyerName: 'Alice Smith',
      product: 'Handmade Vase',
      date: '2024-08-10',
      amount: 50,
    },
    {
      id: 2,
      buyerName: 'Bob Johnson',
      product: 'Wooden Bowl',
      date: '2024-08-12',
      amount: 75,
    },
    {
      id: 3,
      buyerName: 'Carol White',
      product: 'Ceramic Plate',
      date: '2024-08-14',
      amount: 30,
    },
  ]);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const totalPrice = await getTotalPrice();
        setTotalAmount(totalPrice);
      } catch (error) {
        console.error('Failed to fetch total amount:', error);
      }
    };

    fetchTotalAmount();
  }, []);

  return (
    <div className="seller-profile-dashboard">
      {/* Seller Profile Section */}
      <div className="seller-summary">
        <h2>{userName}</h2>
        <p>Total Amount in Account: {totalAmount.toFixed(2)} ICP</p>
      </div>

      {/* Transactions Table */}
      <div className="transactions-section">
        <div className="Transaction">
          <h3>Transaction Details</h3>
        </div>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.buyerName}</td>
                <td>{transaction.product}</td>
                <td>{transaction.date}</td>
                <td>${transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Products Button */}
      <div className="add-products-button">
        <Link to="/Seller">
          <button className="btn-add-product">Add Products</button>
        </Link>
      </div>
    </div>
  );
};

export default Sellerprofile;
