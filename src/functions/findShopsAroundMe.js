import axios from "axios";

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

const findShopsAroundMe = async (long, lat, distance, setData) => {
  let allData = [];
  const resultData = [];
  try {
    const url =
      "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurants?nbPerPage=9999";
    const response = await axios.get(url);
    allData = response.data.restaurants;
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
    return;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export default findShopsAroundMe;
