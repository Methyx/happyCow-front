import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

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
  const [distance, setDistance] = useState(
    Cookies.get("happyCow-distance") || 500
  );

  // functions
  const [debouncedDistance, setDebouncedDistance] = useState(
    Cookies.get("happyCow-distance") || 500
  );

  const debounceDistance = useRef(
    debounce((nb) => {
      setDebouncedDistance(nb);
      Cookies.set("happyCow-distance", nb);
    }, 1000)
  ).current;

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          Cookies.set("happyCow-Position", JSON.stringify(marker.getLatLng()));
        }
      },
    }),
    []
  );

  // UseEffect
  useEffect(() => {
    const getPosition = async () => {
      const cookiesPosition = await Cookies.get("happyCow-Position");
      if (cookiesPosition) {
        setPosition(JSON.parse(cookiesPosition));
        setIsLocated(true);
        return;
      }
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
            },
            (error) => {
              setPosition({
                lng: 2.3522219,
                lat: 48.856614,
              });
            }
          );
        } else {
          setPosition({
            lng: 2.3522219,
            lat: 48.856614,
          });
        }
      }
      setIsLocated(true);
    };
    getPosition();
  }, [reloadPage]);

  useEffect(() => {
    if (isLocated) {
      findShopsAroundMe(
        position.lng,
        position.lat,
        debouncedDistance,
        setShopsAround,
        setIsSearchingAround
      );
    }
    setReloadPage(false);
  }, [isLocated, position, debouncedDistance, reloadPage, setReloadPage]);

  return (
    <div className="container page-around-me">
      {isLocated && !isSearchingAround ? (
        <div className="around-me">
          <div className="map-header">
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
            <div className="distance">
              <div className="gps">
                <img src={require("../img/here.svg").default} alt="" />
                <div
                  className="raz-position"
                  onClick={() => {
                    Cookies.remove("happyCow-Position");
                    setReloadPage(true);
                  }}
                >
                  RAZ Position
                </div>
              </div>
              <div className="right">
                <p>distance (meters) :</p>
                <Box sx={{ width: "45%" }}>
                  <Slider
                    value={distance}
                    min={100}
                    max={10000}
                    step={100}
                    valueLabelDisplay="on"
                    onChange={(event) => {
                      setDistance(event.target.value);
                      debounceDistance(event.target.value);
                    }}
                  />
                </Box>
              </div>
            </div>
          </div>
          <div className="map-inside">
            <MapContainer
              className="map-container"
              center={[position.lat, position.lng]}
              zoom={14}
              maxZoom={18}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={position}
                icon={homeIcon}
                draggable={true}
                eventHandlers={eventHandlers}
                ref={markerRef}
              >
                <Popup>
                  <p>
                    Your Position
                    <br /> Drag to force position
                  </p>
                </Popup>
              </Marker>
              {shopsAround.length &&
                shopsAround.map((shop) => {
                  return (
                    <Marker
                      key={shop._id}
                      position={shop.location}
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
