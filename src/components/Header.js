// style
import "../style/header.css";

// logos
import logo from "../img/HappyCow_Logo_Head_Text.svg";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header>
      <div className="left">
        <FontAwesomeIcon icon="bars" className="icon-menu" />
        <img src={logo} className="logo" alt="logo HappyCow" />
        <div className="menu">
          <nav>menu 1</nav>
          <nav>menu 2</nav>
          <nav>menu 3</nav>
        </div>
      </div>
      <div className="right">
        <button className="sign">Login / Join</button>
      </div>
    </header>
  );
};

export default Header;
