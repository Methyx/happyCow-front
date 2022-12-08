import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// component
import IsLoading from "../components/IsLoading";

// functions
import findShopsAroundMe from "../functions/findShopsAroundMe";
import categoriesIconsLeaflet from "../functions/categoriesIconsLeaflet";

// style
import "../style/aroundMe.css";

const AroundMe = ({ setModalFiltersVisible, reloadPage, setReloadPage }) => {
  // Icon Leaflet
  const homeIcon = new L.Icon({
    iconUrl: require("../img/here.svg").default,
    iconSize: new L.Point(40, 40),
  });

  const navigate = useNavigate();

  // UseState
  const [position, setPosition] = useState({});
  const [isLocated, setIsLocated] = useState(false);
  const [shopsAround, setShopsAround] = useState([]);
  const [isSearchingAround, setIsSearchingAround] = useState(true);
  // const [reloadPage, setReloadPage] = useState(false);

  // UseEffect
  useEffect(() => {
    const getPosition = async () => {
      if ("geolocation" in navigator) {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
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

  useEffect(() => {
    if (isLocated) {
      findShopsAroundMe(
        position.lng,
        position.lat,
        10000,
        setShopsAround,
        setIsSearchingAround
      );
    }
    setReloadPage(false);
  }, [isLocated, position, reloadPage, setReloadPage]);

  return (
    <div className="container page-around-me">
      {isLocated && !isSearchingAround ? (
        <div className="around-me">
          <div className="filters">
            <div
              className="raz-filters"
              onClick={() => {
                Cookies.remove("happyCow-ContextFilters");
                setReloadPage(true);
              }}
            >
              RAZ filters
            </div>
            <div
              className="set-filters"
              onClick={() => {
                setModalFiltersVisible(true);
              }}
            >
              <span>
                <FontAwesomeIcon icon="filter" />
              </span>
              SET filters
            </div>
          </div>
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
            {shopsAround.length &&
              shopsAround.map((shop) => {
                return (
                  <Marker
                    key={shop._id}
                    position={[shop.location.lat, shop.location.lng]}
                    icon={categoriesIconsLeaflet(shop.category)}
                  >
                    <Popup>
                      <button
                        onClick={() => {
                          navigate(`/zoom/${shop._id}`);
                        }}
                      >
                        {shop.name}
                      </button>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>
      ) : (
        <div className="waiting">
          {!isLocated ? (
            <p>Creating Map ...</p>
          ) : (
            <p>Searching around you ...</p>
          )}

          <IsLoading />
        </div>
      )}
    </div>
  );
};
export default AroundMe;
