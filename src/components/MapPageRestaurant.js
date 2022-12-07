import { useState, useEffect } from "react";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapPageRestaurant = ({ restaurant }) => {
  // Icon Leaflet
  const homeIcon = new L.Icon({
    iconUrl: require("../img/here.svg").default,
    iconSize: new L.Point(40, 47),
  });
  const placeIcon = new L.Icon({
    iconUrl: require("../img/placeholder.svg").default,
    iconSize: new L.Point(40, 47),
  });

  // UseState
  const [position, setPosition] = useState({ lng: 2.3522219, lat: 48.856614 });

  // UseEffect
  useEffect(() => {
    const getPosition = async () => {
      if ("geolocation" in navigator) {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
        if (permission.state === "granted") {
          await navigator.geolocation.getCurrentPosition((position) => {
            setPosition({
              lng: position.coords.longitude,
              lat: position.coords.latitude,
            });
          });
        }
      }
    };
    getPosition();
  }, []);

  return (
    <MapContainer
      className="map-container"
      center={[restaurant.location.lat, restaurant.location.lng]}
      zoom={12}
      maxZoom={18}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[position.lat, position.lng]} icon={homeIcon}>
        <Popup>my position</Popup>
      </Marker>
      <Marker
        position={[restaurant.location.lat, restaurant.location.lng]}
        icon={placeIcon}
      >
        <Popup>{restaurant.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapPageRestaurant;
