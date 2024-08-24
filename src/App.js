import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Login from './Pages/Login';
import Seller from './Pages/Seller';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [currency, setCurrency] = useState('USD'); // Default currency

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
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar 
          isAuthenticated={isAuthenticated} 
          userName={userName} 
          onLogout={handleLogout} 
        />
        <Routes>
          <Route path='/' element={<Shop currency={currency} />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" currency={currency} />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" currency={currency} />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" currency={currency} />} />
          <Route path="/product" element={<Product currency={currency} />}>
            <Route path=':productId' element={<Product currency={currency} />} />
          </Route>
          <Route path='/cart' element={<Cart currency={currency} />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<LoginSignup />} />
          <Route path='/seller' element={<Seller />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
