import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
      <a className="navbar-brand" id="logo" href="#">
        <i className="fa-solid fa-circle"></i>
        <p>Lawliet</p>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto" id="nav-links">
          <li className="nav-item active">
            <a className="nav-link" href="#CONTACT">CONTACT</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#TESTIMONIALS">TESTIMONIALS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#ABOUT">ABOUT</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#TERMS">TERMS</a>
          </li>
          <li className="nav-item">
            <Link to={"/Dashboard"}>
            <strong>
              Dashboard
            </strong>
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            id="search"
            type="submit"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
