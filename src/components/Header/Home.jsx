// header component with home button only

import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
    return (
        <header className="header">
        <Link to="/verification-payment" className="home-link">
            <h1 className="home-heading">Home</h1>
        </Link>
        </header>
    );
    }

export default Home;