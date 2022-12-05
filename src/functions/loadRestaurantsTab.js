import axios from "axios";
import Cookies from "js-cookie";

const loadRestaurantsTab = async (
  setRestaurantsTab,
  page,
  nbPerPage,
  stringSearched,
  titleOnly,
  setIsLoading
) => {
  let url = "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurants";
  url += "?page=" + page;
  url += "&nbPerPage=" + nbPerPage;
  if (stringSearched) {
    url += "&string=" + stringSearched;
  }
  if (titleOnly) {
    url += "&nameOnly=true";
  }
  const filtersTxt = await Cookies.get("happyCow-ContextFilters");
  if (filtersTxt) {
    const filters = JSON.parse(filtersTxt);

    if (filters.category) {
      url += "&category=" + filters.category;
    }
    if (filters.type) {
      url += "&type=" + filters.type;
    }
    if (filters.miniRating) {
      url += "&rating=" + filters.miniRating;
    }
    if (filters.favoritesOnly) {
      // A implémenter plus tard
    }
  }
  console.log(url);
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    setRestaurantsTab(response.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export default loadRestaurantsTab;
