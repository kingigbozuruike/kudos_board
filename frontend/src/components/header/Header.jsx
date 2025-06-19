import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="logo">
                <img src="logo.png" alt="" />
                <h1>Kudos Board</h1>
            </Link>
        </div>
    );
};

export default Header;
