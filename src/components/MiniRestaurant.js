import "../style/mini-restaurant.css";

const MiniRestaurant = ({ restaurant }) => {
  return (
    <div className="mini-restaurant">
      <img src={restaurant.thumbnail} alt="restaurant" />
      <p>{restaurant.name}</p>
      <p>{restaurant.description}</p>
    </div>
  );
};

export default MiniRestaurant;
