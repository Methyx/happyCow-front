import axios from "axios";

const loadRestaurantsTab = async (
  setRestaurantsTab,
  page,
  nbPerPage,
  stringSearched,
  setIsLoading
) => {
  let url = "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurants";
  url += "?page=" + page;
  url += "&nbPerPage=" + nbPerPage;
  if (stringSearched) {
    url += "&string=" + stringSearched;
  }
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
