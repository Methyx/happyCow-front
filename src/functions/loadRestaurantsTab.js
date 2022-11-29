import axios from "axios";

const loadRestaurantsTab = async (
  setRestaurantsTab,
  page,
  nbPerPage,
  setIsLoading
) => {
  let url = "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurants";
  url += "?page=" + page;
  url += "&nbPerPage=" + nbPerPage;
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
