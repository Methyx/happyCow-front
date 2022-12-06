import axios from "axios";
import Cookies from "js-cookie";

// functions
import { isFavorite } from "./handleFavorites";

const loadRestaurantsTab = async (
  setRestaurantsTab,
  page,
  nbPerPage,
  stringSearched,
  titleOnly,
  setIsLoading
) => {
  let url = "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurants";
  let filters = {};
  const filtersTxt = await Cookies.get("happyCow-ContextFilters");
  if (filtersTxt && JSON.parse(filtersTxt).favoritesOnly) {
    // on favorites only, pagination will be after
    url += "?page=1";
    url += "&nbPerPage=9999";
  } else {
    url += "?page=" + page;
    url += "&nbPerPage=" + nbPerPage;
  }
  if (stringSearched) {
    url += "&string=" + stringSearched;
  }
  if (titleOnly) {
    url += "&nameOnly=true";
  }
  if (filtersTxt) {
    filters = JSON.parse(filtersTxt);

    if (filters.category) {
      url += "&category=" + filters.category;
    }
    if (filters.type) {
      url += "&type=" + filters.type;
    }
    if (filters.miniRating) {
      url += "&rating=" + filters.miniRating;
    }
  }
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    if (filters?.favoritesOnly) {
      const resultFavoritesTab = [];
      for (let i = 0; i < response.data.restaurants.length; i++) {
        if (isFavorite(response.data.restaurants[i]._id)) {
          resultFavoritesTab.push(response.data.restaurants[i]);
        }
      }
      const resultTab = [];
      for (
        let i = (page - 1) * nbPerPage;
        i < Math.min(resultFavoritesTab.length, page * nbPerPage);
        i++
      ) {
        resultTab.push(resultFavoritesTab[i]);
      }
      setRestaurantsTab({
        count: resultFavoritesTab.length,
        restaurants: resultTab,
      });
    } else {
      setRestaurantsTab(response.data);
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export default loadRestaurantsTab;
