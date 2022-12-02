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

import banner from "../img/bg.home.large.webp";
import tear from "../img/tear.svg";

const Home = () => {
  const [restaurantsTab, setRestaurantsTab] = useState([]);
  const [page, setPage] = useState(1);
  const [nbPerPage, setNbPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [stringSearched, setStringSearched] = useState("");

  useEffect(() => {
    setIsLoading(true);
    loadRestaurantsTab(
      setRestaurantsTab,
      page,
      nbPerPage,
      stringSearched,
      setIsLoading
    );
  }, [page, nbPerPage, stringSearched]);

  const nbPages = Math.ceil(restaurantsTab.count / nbPerPage);

  return (
    <div className="home-page">
      <div className="top-home-banner">
        <img src={banner} className="banner-img" alt="food" />
        <img src={tear} className="tear-img" alt="tear" />
        <input
          type="text"
          placeholder="search"
          value={stringSearched}
          onChange={(event) => {
            setStringSearched(event.target.value);
          }}
          className="search"
        />
      </div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="restaurants container">
          <h1>Number of shops : {restaurantsTab.count}</h1>
          <p className="nbPerPage">
            Shops per page :
            <input
              type="number"
              value={nbPerPage}
              onChange={(event) => {
                if (event.target.value > 0) {
                  const stock = event.target.value;
                  setTimeout(() => {
                    setNbPerPage(stock);
                  }, 300);
                }
              }}
            />
          </p>
          <div className="list-of-restaurants">
            {restaurantsTab.restaurants.map((item) => {
              return (
                <MiniRestaurant
                  key={item._id}
                  restaurant={item}
                  className="shop"
                />
              );
            })}
          </div>
          <div className="handle-page">
            {page > 1 && (
              <button
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                {"<"}
              </button>
            )}
            <span>{`  Page ${page} /${nbPages}  `}</span>
            {page < nbPages && (
              <button
                onClick={() => {
                  if (page < nbPages) {
                    setPage(page + 1);
                  }
                }}
              >
                {">"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
