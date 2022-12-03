const typeIcons = (type) => {
  switch (type) {
    case "vegan":
      return (
        <div
          className="type-icon"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={require("../img/category_vegan.svg").default}
            style={{ marginRight: "5px" }}
            alt="icon"
          />
          vegan
        </div>
      );
    case "vegetarian":
      return (
        <div
          className="type-icon"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={require("../img/category_vegetarian.svg").default}
            style={{ marginRight: "5px" }}
            alt="icon"
          />
          vegetarian
        </div>
      );
    case "veg-option":
      return (
        <div
          className="type-icon"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={require("../img/category_veg-friendly.svg").default}
            style={{ marginRight: "5px" }}
            alt="icon"
          />
          veg-friendly
        </div>
      );
    default:
      return;
  }
};

export default typeIcons;
