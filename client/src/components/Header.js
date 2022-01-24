import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useNavigate } from "react-dom";
import Auth from "../utils/Auth";
import LampIcon from "../assets/lamp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { QUERY_PRODUCTS } from "../utils/Queries";
import { useQuery } from "@apollo/client";

const Header = () => {
  const style = {
    h1: {
      fontSize: "3rem",
      textDecoration: "none",
      color: "black",
    },
    image: {
      width: "50px",
    },
    link: {
      marginTop: "15px",
      marginLeft: "15px",
      marginBottom: "15px",
    },
    linkDiv: {
      marginTop: "25px",
    },
  };

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const product = data?.products || {};

  const productArray = [];

  const logout = (event) => {
    event.preventDefault();

    for (var i = 0; i < product.length; i++) {
      const aProduct =
        Array.isArray(product) && product.length ? product[i] : {};
      productArray.push(aProduct);
      console.log(productArray[i].name);
      localStorage.setItem(productArray[i].name, 0);
    }

    Auth.logout();
    setLoginStatus(false);
    handleClick();
  };

  const [isLoggedIn, setLoginStatus] = useState(true);

  useEffect(() => {
    console.log("Login status: " + isLoggedIn);
  });

  const history = useHistory();
  const handleClick = () => history.push("/login");

  return (
    <header className="text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link style={style.h1} to="/">
          SCALING-LAMP
        </Link>
        <img src={LampIcon} style={style.image}></img>
        <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
          An ecommerce demo site.
        </div>
        <div style={style.linkDiv}>
          {!Auth.loggedIn() ? (
            <>
              <Link
                className="btn btn-outline-dark"
                style={style.link}
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-dark"
                style={style.link}
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-dark" style={style.link} to="/">
                Shop
              </Link>

              <Link
                className="btn btn-outline-dark"
                style={style.link}
                to="/myprofile"
              >
                My Profile
              </Link>

              <Link
                className="btn btn-outline-dark"
                style={style.link}
                to="/mycart"
              >
                My Cart
              </Link>

              <Link
                className="btn btn-outline-dark"
                style={style.link}
                to="/manageproduct"
              >
                Manage Product
              </Link>

              <Link
                className="btn btn-outline-dark"
                style={style.link}
                to="/login"
                onClick={logout}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
