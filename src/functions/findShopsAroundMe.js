import axios from "axios";
import Cookies from "js-cookie";

// functions
import { isFavorite } from "./handleFavorites";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Start HERE

const findShopsAroundMe = async (
  long,
  lat,
  distance,
  setData,
  setIsSearchingAround
) => {
  setIsSearchingAround(true);
  let allData = [];
  const resultData = [];

  try {
    let url = "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurants";
    url += "?page=1";
    url += "&nbPerPage=9999";
    let filters = {};
    const filtersTxt = await Cookies.get("happyCow-ContextFilters");

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
    const response = await axios.get(url);
    // console.log(response.data);
    if (filters?.favoritesOnly) {
      const resultFavoritesTab = [];
      for (let i = 0; i < response.data.restaurants.length; i++) {
        if (isFavorite(response.data.restaurants[i]._id)) {
          resultFavoritesTab.push(response.data.restaurants[i]);
        }
      }
      allData = resultFavoritesTab;
    } else {
      allData = response.data.restaurants;
    }

    // const url =
    //   "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurants?nbPerPage=9999";
    // const response = await axios.get(url);
    // allData = response.data.restaurants;
    for (let i = 0; i < allData.length; i++) {
      const distanceCalculated =
        getDistanceFromLatLonInKm(
          lat,
          long,
          allData[i].location.lat,
          allData[i].location.lng
        ) * 1000;
      if (distanceCalculated <= distance) {
        resultData.push(allData[i]);
      }
    }
    setData(resultData);
    setIsSearchingAround(false);
    return;
  } catch (error) {
    console.log(error.message);
    setIsSearchingAround(false);
    return;
  }
};

export default findShopsAroundMe;
