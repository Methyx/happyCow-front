import Cookies from "js-cookie";
import handleUser from "./handleUser";

export const isFavorite = (id) => {
  const token = Cookies.get("happyCowToken");
  if (!token) {
    return false;
  }
  const favoritesTxt = Cookies.get("happyCowFavorites");
  if (!favoritesTxt) {
    return false;
  }
  const favorites = JSON.parse(favoritesTxt);
  if (favorites.length === 0) {
    return false;
  }
  return favorites.includes(id);
};

export const toggleFavorite = (id, setModalLoginVisible, setUser) => {
  const token = Cookies.get("happyCowToken");
  if (!token) {
    return setModalLoginVisible(true);
  }
  const favoritesTxt = Cookies.get("happyCowFavorites");
  let favorites = [];
  if (favoritesTxt) {
    favorites = JSON.parse(favoritesTxt);
  }
  const index = favorites.indexOf(id);
  if (index === -1) {
    // Add favorite
    favorites.push(id);
  } else {
    // Remove favorite
    favorites.splice(index, 1);
  }
  Cookies.set("happyCowFavorites", JSON.stringify(favorites));
  handleUser(
    "save",
    {
      token: token,
      email: "",
      username: "",
      favorites: [...favorites],
      avatar: null,
    },
    setUser
  );
};
