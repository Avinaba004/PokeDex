import React from 'react';
import './Header.css';
import logo from './logo.png'; 

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>PokeDex</h1>
    </header>
  );
}

export default Header;
