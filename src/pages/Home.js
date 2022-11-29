// major imports
import { useState, useEffect } from "react";

// spinner
import IsLoading from "../components/IsLoading";

// style
import "../style/home.css";

// components
import MiniRestaurant from "../components/MiniRestaurant";

// functions
import loadRestaurantsTab from "../functions/loadRestaurantsTab";

const Home = () => {
  const [restaurantsTab, setRestaurantsTab] = useState([]);
  const [page, setPage] = useState(1);
  const [nbPerPage, setNbPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loadRestaurantsTab(setRestaurantsTab, page, nbPerPage, setIsLoading);
  }, [page, nbPerPage]);

  return (
    <div className="home-page">
      <div className="top-home-banner">banner !</div>
      <div className="restaurants container">
        <h1>List of restaurants : {restaurantsTab.count}</h1>
        {isLoading ? (
          <IsLoading />
        ) : (
          <div className="list-of-restaurants">
            {restaurantsTab.restaurants.map((item) => {
              return <MiniRestaurant key={item._id} restaurant={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
