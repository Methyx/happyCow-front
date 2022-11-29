// major imports
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// component
import IsLoading from "../components/IsLoading";

// function
import createStars from "../functions/createStars";

// style
import "../style/restaurant.css";

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
  }, []);

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
          </div>
          <div className="right-side"></div>
        </div>
      )}
    </div>
  );
};
export default Restaurant;
