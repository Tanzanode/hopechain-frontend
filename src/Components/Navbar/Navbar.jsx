import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import user_icon from '../Assets/user_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = ({ isAuthenticated, userName, onLogout, items = [] }) => {
  const [menu, setMenu] = useState("shop");
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!items || !Array.isArray(items)) { 
        setSearchResults([]);
        return;
    }

    const results = items.filter(item => 
        item.productName.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => { setMenu("shop") }} className="nav-logo">
        <img src={logo} alt="HopeChain Logo" />
        <p>HopeChain</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="Menu Dropdown" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
        <li onClick={() => { setMenu("mens") }}><Link to='/mens'>Designs</Link>{menu === "mens" ? <hr /> : null}</li>
        <li onClick={() => { setMenu("womens") }}><Link to='/womens'>Textiles</Link>{menu === "womens" ? <hr /> : null}</li>
        <li onClick={() => { setMenu("kids") }}><Link to='/kids'>Kitchenware</Link>{menu === "kids" ? <hr /> : null}</li>
      </ul>

      <div className="nav-search">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearch} 
          placeholder="What are you looking for?"
        />
        {searchQuery && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map(result => (
              <div key={result.id} className="search-item">
                <Link to={`/product/${result.id}`} onClick={() => setSearchQuery('')}>
                  <img src={result.image} alt={result.productName} />
                  <div>{result.productName}</div>
                  <div>{result.category}</div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav-login-cart">
        {isAuthenticated ? (
          <>
            <Link to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
            <div className="user-icon-container" onMouseEnter={toggleUserDropdown} onMouseLeave={toggleUserDropdown}>
              <img src={user_icon} alt="User Icon" className="user-icon" />
              {userDropdownVisible && (
                <div className="user-dropdown">
                  <Link to="#">{userName}</Link>
                  <Link to='/' onClick={() => setUserDropdownVisible(false)}>Buyer Mode</Link>
                  <Link to='/SellerProfile' onClick={() => setUserDropdownVisible(false)}>Seller Mode</Link>
                  <button onClick={() => { onLogout(); setUserDropdownVisible(false); }}>Logout</button>
                </div>
              )}
            </div>
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
