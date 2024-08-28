import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Login from './Pages/Login';
import Seller from './Pages/Seller';
import SellerProfile from './Pages/SellerProfile';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import { ProductProvider } from './Context/ProductContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUserName(storedUser);
    }
  }, []);

  const handleLogin = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem('user', name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <ProductProvider>
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          userName={userName}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="Designs" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="Textiles" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="Kitchenware" />} />
          <Route path="/product/:productId" element={<Product />} /> 
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<LoginSignup />} />
          <Route path='/seller' element={<Seller userName={userName} />} />
          <Route path='/sellerProfile' element={<SellerProfile userName={userName} />} />
        </Routes>
        <Footer />
      </div>
    </ProductProvider>
  );
}

export default App;
