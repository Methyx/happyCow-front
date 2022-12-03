import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categoriesIcons = (cat) => {
  switch (cat) {
    case 0:
      return (
        <FontAwesomeIcon
          icon="utensils"
          style={{
            backgroundColor: "var(--happyCow-color)",
            borderRadius: "50%",
            borderWidth: 2,
            color: "white",
            fontSize: "16px",
            padding: "6px",
          }}
        />
      );
    case 1:
      return (
        <img
          src={require("../img/category_health-store.svg").default}
          alt="icon"
        />
      );
    case 2:
      return (
        <img src={require("../img/category_veg-shop.svg").default} alt="icon" />
      );
    case 12:
      return (
        <img
          src={require("../img/category_ice-cream.svg").default}
          alt="icon"
        />
      );
    default:
      return (
        <img src={require("../img/category_other.svg").default} alt="icon" />
      );
  }
};

export default categoriesIcons;
