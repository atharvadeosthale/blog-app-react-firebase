import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__container">
          <div className="navbar__left">
            <div className="navbar__item">
              <Avatar src="https://instagram.fnag7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/134142858_728445697781161_1896311326416866300_n.jpg?_nc_ht=instagram.fnag7-1.fna.fbcdn.net&_nc_ohc=pIxEQt_lzegAX_ZiLd3&tp=1&oh=57c9f4f26706a16a4a39f0860db1b24e&oe=60193F5E" />
            </div>
            <div className="navbar__item">
              <b>
                <Link to="/" className="navbar__link">
                  ATHARVA DEOSTHALE
                </Link>
              </b>
            </div>
          </div>
          <div className="navbar__right">
            <div className="navbar__item">
              <Avatar style={{ height: 35, width: 35 }} />
            </div>
            <div className="navbar__item">
              <Link to="/login" className="navbar__link">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
