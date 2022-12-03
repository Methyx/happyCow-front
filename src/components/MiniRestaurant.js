// major imports
import { Link } from "react-router-dom";

// style
import "../style/mini-restaurant.css";

// functions
import createStars from "../functions/createStars";
import categoriesIcons from "../functions/categoriesIcons";

//
const MiniRestaurant = ({ restaurant }) => {
  const addressTab = restaurant.address.split(",");
  const zipCode = addressTab.pop();
  const country = addressTab.pop();
  const city = addressTab.pop();

  return (
    <Link to={`/zoom/${restaurant._id}`} className="mini-restaurant">
      <img src={restaurant.thumbnail} alt="restaurant" />
      <div className="title">
        {categoriesIcons(restaurant.category)}
        <h3>{restaurant.name}</h3>
      </div>
      <h4>
        {zipCode} - {city} , {country}
      </h4>
      <div className="rating">
        {createStars(restaurant.rating)}
        <span>{restaurant.rating}/5</span>
      </div>
      <p>{restaurant.description}</p>
    </Link>
  );
};

export default MiniRestaurant;
