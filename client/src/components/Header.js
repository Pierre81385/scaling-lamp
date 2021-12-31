import React from "react";
import { Link } from "react-router-dom";

import Auth from "../utils/Auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 style={{ fontSize: "3rem" }}>Shop Here</h1>
        </Link>
        <div>
          {!Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/signup">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-light m-2" to="/">
                SHOP
              </Link>

              <Link className="btn btn-lg btn-light m-2" to="/addproduct">
                Add Product
              </Link>

              <Link
                className="btn btn-lg btn-light m-2"
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
