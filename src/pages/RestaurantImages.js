import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//functions
import loadRestaurantById from "../functions/loadRestaurantById";
import createStars from "../functions/createStars";

// components
import IsLoading from "../components/IsLoading";

// style
import "../style/RestaurantImages.css";

const RestaurantImages = ({ setModalPhotoVisible, setImageInModal }) => {
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
    <>
      {isLoading ? (
        <div className="container">
          <IsLoading />
        </div>
      ) : (
        <div className="all-images">
          <div className="head">
            <div className="container">
              <h1>
                {`${restaurant.pictures.length} Photos of `}
                <span>{restaurant.name}</span>
                {` - ${
                  restaurant.address.split(",")[
                    restaurant.address.split(",").length - 3
                  ]
                }`}
              </h1>
              <div className="rating">
                {createStars(restaurant.rating)}
                <span>{restaurant.rating}/5</span>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="photo-grid">
              {restaurant.pictures.map((item, index) => {
                return (
                  <img
                    onClick={() => {
                      setImageInModal(item);
                      setModalPhotoVisible(true);
                    }}
                    key={index}
                    src={item}
                    alt={restaurant.name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantImages;
