import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import user_icon from '../Assets/user_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = ({ isAuthenticated, userName, onLogout, currency, onCurrencyChange }) => {
  const [menu, setMenu] = useState("shop");
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible);
  };

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => { setMenu("shop") }} className="nav-logo">
        <img src={logo} alt="HopeChain Logo" />
        <p>HopeChain</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="Menu Dropdown" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("mens") }}><Link to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("womens") }}><Link to="womens">Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}><Link to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <select className="nav-currency-selector" value={currency} onChange={onCurrencyChange}>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
        <option value="BTC">Bitcoin</option>
        <option value="ETH">Ether</option>
        <option value="ICP">ICP</option>
      </select>
      <div className="nav-login-cart">
        {isAuthenticated ? (
          <>
            <span>Welcome, {userName}!</span>
            <div className="user-icon-container" onMouseEnter={toggleUserDropdown} onMouseLeave={toggleUserDropdown}>
              <img src={user_icon} alt="User Icon" className="user-icon" />
              {userDropdownVisible && (
                  <div className="user-dropdown">
                      <Link to='/' onClick={() => setUserDropdownVisible(false)}>Buyer Mode</Link>
                      <Link to='/seller' onClick={() => setUserDropdownVisible(false)}>Seller Mode</Link>
                  </div>
              )}
            </div>
            <Link to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
            <Link to='/login'><button>Login</button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

