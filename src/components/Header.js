import { Link } from "react-router-dom";
import { useEffect } from "react";

// style
import "../style/header.css";

// images
import logo from "../img/HappyCow_Logo_Head_Text.svg";
import nobody from "../img/Unknown_person.jpg";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ setModalLoginVisible, user, setUser, handleUser }) => {
  useEffect(() => {
    handleUser("load", user, setUser);
  }, []);

  return (
    <header>
      <div className="left">
        <FontAwesomeIcon icon="bars" className="icon-menu" />
        <Link to={"/"}>
          <img src={logo} className="logo" alt="logo HappyCow" />
        </Link>
        <div className="menu">
          <nav>menu 1</nav>
          <nav>menu 2</nav>
          <nav>menu 3</nav>
        </div>
      </div>
      <div className="right">
        {user.token ? (
          <>
            <img
              src={user.avatar ? user.avatar : nobody}
              alt="avatar"
              className="avatar"
            />
            <span className="username">{user.username}</span>
            <button
              className="sign"
              onClick={() => {
                handleUser("remove", null, setUser);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="sign"
            onClick={() => {
              setModalLoginVisible(true);
            }}
          >
            Login / Join
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
