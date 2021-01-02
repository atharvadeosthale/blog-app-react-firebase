import { Avatar } from "@material-ui/core";
import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__container">
          <div className="navbar__left">Left</div>
          <div className="navbar__right">
            <div className="navbar__item">
              <Avatar style={{ height: 35, width: 35 }} />
            </div>
            <div className="navbar__item">haha</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
