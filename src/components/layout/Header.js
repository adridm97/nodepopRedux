import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import Button from "../common/Button";
import { ReactComponent as Icon } from "../../assets/logo.svg";
import { authLogout } from "../../store/actions";
import { getIsLogged } from "../../store/selectors";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../auth/service";

import "./Header.css";

function Header({ className }) {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout().then(() => {
      dispatch(authLogout());
    });
  };
  return (
    <header className={classNames("header", className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width="32" height="32" />
        </div>
      </Link>
      <nav className="header-nav">
        <Link to="/ad/new">New Ad</Link>
        {isLogged ? (
          <Button className="header-button" onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <Button
            variant="primary"
            className="header-button"
            as={Link}
            to="/login"
          >
            Log in
          </Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
