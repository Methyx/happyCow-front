// major imports
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";

// carousel
import "react-multi-carousel/lib/styles.css";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// component
import IsLoading from "../components/IsLoading";

// function
import createStars from "../functions/createStars";

// style
import "../style/restaurant.css";

// Icon Leaflet
const customIcon = new L.Icon({
  iconUrl: require("../img/location.svg").default,
  iconSize: new L.Point(40, 47),
});

const Restaurant = () => {
  const { id } = useParams();

  // UseStates
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);

  // UseEffect
  useEffect(() => {
    const loadRestaurant = async (id) => {
      try {
        setIsLoading(true);
        let url =
          "https://site--happycow-back--gw6mlgwnmzwz.code.run/restaurant/";
        url += id;
        const response = await axios.get(url);
        setRestaurant(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadRestaurant(id);
  }, [id]);

  // Carousel
  const carouselResponsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // RETURN
  return (
    <div className="container">
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="restaurant">
          <div className="left-side">
            <h1>{restaurant.name}</h1>
            <div className="rating">
              {createStars(restaurant.rating)}
              <span>{restaurant.rating}/5</span>
            </div>
            <Carousel
              responsive={carouselResponsive}
              containerClass="carousel-container"
              swipeable
            >
              {restaurant.pictures.map((item, index) => {
                return (
                  <img
                    className="carousel-image"
                    key={index}
                    src={item}
                    alt="restaurant's food"
                  />
                );
              })}
            </Carousel>
            <p className="description">{restaurant.description}</p>
          </div>
          <div className="right-side">
            <div>
              <MapContainer
                className="map-container"
                center={[restaurant.location.lat, restaurant.location.lng]}
                zoom={13}
                maxZoom={18}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[restaurant.location.lat, restaurant.location.lng]}
                  icon={customIcon}
                >
                  <Popup>{restaurant.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Restaurant;
