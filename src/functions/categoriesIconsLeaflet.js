import L from "leaflet";

const categoriesIconsLeaflet = (cat) => {
  switch (cat) {
    case 0:
      return L.icon({
        iconUrl: require("../img/restau.png"),
        iconSize: new L.Point(30, 30),
      });
    case 1:
      return L.icon({
        iconUrl: require("../img/category_health-store.svg").default,
        iconSize: new L.point(30, 30),
      });
    case 2:
      return L.icon({
        iconUrl: require("../img/category_veg-shop.svg").default,
        iconSize: new L.point(30, 30),
      });
    case 12:
      return L.icon({
        iconUrl: require("../img/category_ice-cream.svg").default,
        iconSize: new L.point(30, 30),
      });
    default:
      return L.icon({
        iconUrl: require("../img/category_other.svg").default,
        iconSize: new L.point(30, 30),
      });
  }
};

export default categoriesIconsLeaflet;
