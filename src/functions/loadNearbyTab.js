import axios from "axios";

const loadNearbyTab = async (nearbyIds, setData, setIsLoaded) => {
  setIsLoaded(false);
  const baseUrl =
    "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurant/";
  const results = [];
  try {
    for (let i = 0; i < nearbyIds.length; i++) {
      const url = baseUrl + "placeId=" + nearbyIds[i];
      const response = await axios.get(url);
      results.push(response.data);
    }
    setData(results);
    setIsLoaded(true);
  } catch (error) {
    console.log(error.message);
  }
};

export default loadNearbyTab;
