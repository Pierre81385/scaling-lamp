import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MernIcon from "../assets/mern_icon.png";

const Footer = () => {
  const style = {
    image: {
      width: "300px",
      paddingTop: "75px",
    },
  };

  return (
    <footer>
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <img src={MernIcon} style={style.image}></img>
      </div>
    </footer>
  );
};

export default Footer;
