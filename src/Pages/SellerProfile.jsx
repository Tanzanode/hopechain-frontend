import React, { useState } from 'react';
import './CSS/Sellerprofile.css';
import { Link } from 'react-router-dom'; 

const Sellerprofile = () => {
  // Sample data for the seller and transactions
  const [seller] = useState({
    name: 'John Doe',
    totalAmount: 1200,
  });

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

  return (
    <div className="seller-profile-dashboard">
      {/* Seller Profile Section */}
      <div className="seller-summary">
        <h2>{seller.name}</h2>
        <p>Total Amount in Account: ${seller.totalAmount.toFixed(2)}</p>
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