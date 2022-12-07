// major imports
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// style
import "../style/mini-restaurant.css";

// functions
import createStars from "../functions/createStars";
import categoriesIcons from "../functions/categoriesIcons";
import { isFavorite, toggleFavorite } from "../functions/handleFavorites";

//
const MiniRestaurant = ({
  restaurant,
  setModalLoginVisible,
  setUser,
  isDescription,
  top,
}) => {
  const addressTab = restaurant.address.split(",");
  const zipCode = addressTab.pop();
  const country = addressTab.pop();
  const city = addressTab.pop();

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/zoom/${restaurant._id}`);
      }}
      className="mini-restaurant"
    >
      <div className="image-container">
        <img src={restaurant.thumbnail} alt="restaurant" />
        <FontAwesomeIcon
          icon="heart"
          className={
            isFavorite(restaurant._id) ? "heart heart-red" : "heart heart-gray"
          }
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(restaurant._id, setModalLoginVisible, setUser);
          }}
        />
      </div>
      <div className="title">
        {categoriesIcons(restaurant.category)}
        <h3>{restaurant.name}</h3>
      </div>
      <h4>
        {zipCode} - {city} , {country}
      </h4>
      <div className="rating">
        {createStars(restaurant.rating, top)}
        <span>{restaurant.rating}/5</span>
      </div>
      {isDescription && <p>{restaurant.description}</p>}
    </div>
  );
};

export default MiniRestaurant;
