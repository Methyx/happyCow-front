import { Link } from "react-router-dom";

// style
import "../style/header.css";

// logos
import logo from "../img/HappyCow_Logo_Head_Text.svg";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ setModalLoginVisible }) => {
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
        <button
          className="sign"
          onClick={() => {
            setModalLoginVisible(true);
          }}
        >
          Login / Join
        </button>
      </div>
    </header>
  );
};

export default Header;
