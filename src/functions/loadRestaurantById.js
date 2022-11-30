import axios from "axios";

const loadRestaurantById = async (id, setData, setIsLoading) => {
  try {
    setIsLoading(true);
    let url = "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurant/";
    url += id;
    const response = await axios.get(url);
    setData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export default loadRestaurantById;
