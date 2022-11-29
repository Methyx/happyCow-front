// major imports
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// component
import IsLoading from "../components/IsLoading";
import CarouselPageRestaurant from "../components/CarouselPageRestaurant";
import MapPageRestaurant from "../components/MapPageRestaurant";

// function
import createStars from "../functions/createStars";

// style
import "../style/restaurant.css";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <CarouselPageRestaurant restaurant={restaurant} />
            <p className="description">{restaurant.description}</p>
          </div>
          <div className="right-side">
            <MapPageRestaurant restaurant={restaurant} />
            <p>
              <FontAwesomeIcon
                icon="location-dot"
                style={{ marginRight: "15px" }}
              />
              {restaurant.address}
            </p>
            <p>
              <FontAwesomeIcon icon="phone" style={{ marginRight: "15px" }} />
              {restaurant.phone}
            </p>
            <p>
              <FontAwesomeIcon icon="link" style={{ marginRight: "15px" }} />
              <a href={restaurant.website} target="_blank">
                {restaurant.website}
              </a>
            </p>
            <p>
              <FontAwesomeIcon
                icon="people-arrows"
                style={{ marginRight: "15px" }}
              />
              <a href={restaurant.facebook} target="_blank">
                Facebook
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Restaurant;
