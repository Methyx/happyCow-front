import { useState, useEffect } from "react";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// component
import IsLoading from "../components/IsLoading";

// style
import "../style/aroundMe.css";

const AroundMe = () => {
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
  const [position, setPosition] = useState({});
  const [isLocated, setIsLocated] = useState(false);

  // UseEffect
  useEffect(() => {
    const getPosition = async () => {
      if ("geolocation" in navigator) {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
        console.log("permission : ", permission.state);
        if (permission.state !== "denied") {
          await navigator.geolocation.getCurrentPosition(
            (success) => {
              setPosition({
                lng: success.coords.longitude,
                lat: success.coords.latitude,
              });
              setIsLocated(true);
            },
            (error) => {
              setPosition({
                lng: 2.3522219,
                lat: 48.856614,
              });
              setIsLocated(true);
            }
          );
        } else {
          setPosition({
            lng: 2.3522219,
            lat: 48.856614,
          });
          setIsLocated(true);
        }
      }
    };
    getPosition();
  }, []);

  return (
    <>
      {isLocated ? (
        <div className="around-me">
          ========= PAGE in Construction ==========
          <MapContainer
            className="map-container"
            center={[position.lat, position.lng]}
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
          </MapContainer>
        </div>
      ) : (
        <IsLoading />
      )}
    </>
  );
};
export default AroundMe;
