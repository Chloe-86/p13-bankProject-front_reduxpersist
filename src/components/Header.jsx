import React from "react";
import { NavLink } from "react-router-dom";
import abImgLogo from "../assets/img/argentBankLogo.png";

const Header = () => {
  return (
    <header>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={abImgLogo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <NavLink to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
        {/* <NavLink to="/register">S'inscrire</NavLink>
        <NavLink to="/profil">Profil</NavLink> */}
      </nav>
    </header>
  );
};

export default Header;
