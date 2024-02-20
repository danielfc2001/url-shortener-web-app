import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarLink = ({ to, name, children }) => {
  const location = useLocation();
  return (
    <li className="page-navbar-item">
      <Link
        to={to}
        className={`page-navbar-link ${
          location.pathname === to ? "active" : ""
        }`}
      >
        {children}
        {name}
      </Link>
    </li>
  );
};

export default NavbarLink;
