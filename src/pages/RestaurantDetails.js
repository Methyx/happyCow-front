// major imports
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// component
import IsLoading from "../components/IsLoading";
import CarouselPageRestaurant from "../components/CarouselPageRestaurant";
import MapPageRestaurant from "../components/MapPageRestaurant";

// function
import createStars from "../functions/createStars";
import loadRestaurantById from "../functions/loadRestaurantById";

// style
import "../style/restaurant.css";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RestaurantDetails = () => {
  // params dans l'url
  const { id } = useParams();

  // UseStates
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);

  // UseEffect
  useEffect(() => {
    loadRestaurantById(id, setRestaurant, setIsLoading);
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
            <div className="carousel-place">
              <CarouselPageRestaurant restaurant={restaurant} />
              <Link
                to={`/photos/${id}`}
                className="see-all-photos"
              >{`See all photos (${restaurant.pictures.length})`}</Link>
            </div>
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
              <a href={restaurant.website} rel="noreferrer" target="_blank">
                {restaurant.website}
              </a>
            </p>
            <p>
              <FontAwesomeIcon
                icon="people-arrows"
                style={{ marginRight: "15px" }}
              />
              <a href={restaurant.facebook} rel="noreferrer" target="_blank">
                Facebook
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default RestaurantDetails;
