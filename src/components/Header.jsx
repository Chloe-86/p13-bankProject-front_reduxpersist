import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import abImgLogo from "../assets/img/argentBankLogo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      localStorage.removeItem("persistent");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={abImgLogo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        {userId ? (
          <>
            <NavLink to="/profil" className="main-nav-item">
              {userInfo.firstName}
              <i className="fa fa-user-circle"></i>
            </NavLink>
            <NavLink to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
