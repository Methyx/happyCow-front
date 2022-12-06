import { Link } from "react-router-dom";
import { useEffect } from "react";

// style
import "../style/header.css";

// images
import logo from "../img/HappyCow_Logo_Head_Text.svg";
import nobody from "../img/Unknown_person.jpg";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let remove = false;

const Header = ({ setModalLoginVisible, user, setUser, handleUser }) => {
  useEffect(() => {
    if (user.token && !remove) {
      handleUser("load", user, setUser);
    }
  }, [user, setUser, handleUser]);

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
            <Link to="/user" className="user">
              <img
                src={user.avatar ? user.avatar : nobody}
                alt="avatar"
                className="avatar"
              />
              <p className="username">{user.username}</p>
            </Link>
            <button
              className="sign"
              onClick={() => {
                remove = true;
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
