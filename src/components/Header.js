import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// style
import "../style/header.css";

// images
import logo from "../img/HappyCow_Logo_Head_Text.svg";
import nobody from "../img/Unknown_person.jpg";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let remove = false;

const Header = ({ setModalLoginVisible, user, setUser, handleUser }) => {
  const navigate = useNavigate();

  // STATE
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (user.token && !remove) {
      handleUser("load", user, setUser);
    }
  }, [user, setUser, handleUser]);

  const location = useLocation().pathname;

  return (
    <header className={showMenu ? "large" : ""}>
      <div className="left">
        <Link to={"/"}>
          <img
            src={logo}
            className={showMenu ? "logo back-margin" : "logo"}
            alt="logo HappyCow"
          />
        </Link>
        <div>
          <FontAwesomeIcon
            icon="bars"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className="icon-menu"
          />
          <div className={showMenu ? "menu show" : "menu hide"}>
            <div
              onClick={() => {
                setShowMenu(false);
                navigate("/");
              }}
            >
              <nav className={location === "/" ? "here" : ""}> Explore All</nav>
            </div>
            <div
              onClick={() => {
                setShowMenu(false);
                navigate("/AroundMe");
              }}
            >
              <nav className={location === "/AroundMe" ? "here" : ""}>
                Around Me
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        {user.token ? (
          <div className="user-container">
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
          </div>
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
