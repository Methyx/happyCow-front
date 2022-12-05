// major imports
import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

// spinner
import IsLoading from "../components/IsLoading";

// style
import "../style/home.css";

// components
import MiniRestaurant from "../components/MiniRestaurant";

// functions
import loadRestaurantsTab from "../functions/loadRestaurantsTab";
import {
  loadContextHome,
  saveContextHome,
} from "../functions/handleContextHome";

// image
import banner from "../img/bg.home.large.webp";
import tear from "../img/tear.svg";

const Home = ({ setModalFiltersVisible }) => {
  // context

  const [page, setPage] = useState();
  const [nbPerPage, setNbPerPage] = useState();
  const [debouncedNbPerPage, setDebouncedNbPerPage] = useState();
  const [stringInput, setStringInput] = useState();
  const [debouncedStringInput, setDebouncedStringInput] = useState();

  const [restaurantsTab, setRestaurantsTab] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isContextLoaded, setIsContextLoaded] = useState(false);

  // debounce
  const debounceString = useRef(
    debounce((text) => {
      setDebouncedStringInput(text);
      setPage(1);
    }, 500)
  ).current;
  const debounceNbPerPage = useRef(
    debounce((nb) => {
      setDebouncedNbPerPage(nb);
    }, 300)
  ).current;

  // load context only at the arrival on the page
  useEffect(() => {
    loadContextHome(
      setStringInput,
      setDebouncedStringInput,
      setNbPerPage,
      setDebouncedNbPerPage,
      setPage
    );
    setIsContextLoaded(true);
  }, []);

  useEffect(() => {
    if (isContextLoaded) {
      setIsLoading(true);
      loadRestaurantsTab(
        setRestaurantsTab,
        page,
        debouncedNbPerPage,
        debouncedStringInput,
        setIsLoading
      );
      saveContextHome(stringInput, nbPerPage, page);
    }
  }, [isContextLoaded, page, debouncedNbPerPage, debouncedStringInput]);

  const nbPages = Math.ceil(restaurantsTab.count / nbPerPage);

  return (
    <div className="home-page">
      <div className="top-home-banner">
        <img src={banner} className="banner-img" alt="food" />
        <img src={tear} className="tear-img" alt="tear" />
        <div className="search">
          <input
            type="text"
            placeholder="search"
            value={stringInput}
            onChange={(event) => {
              setStringInput(event.target.value);
              debounceString(event.target.value);
            }}
            className="text-input"
          />
          <p
            onClick={() => {
              setModalFiltersVisible(true);
            }}
            className="filters"
          >
            <span>
              <FontAwesomeIcon icon="filter" />
            </span>
            see filters
          </p>
        </div>
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
                setNbPerPage(event.target.value);
                if (event.target.value > 0) {
                  debounceNbPerPage(event.target.value);
                } else {
                  setTimeout(() => {
                    if (event.target.value <= 0) {
                      setNbPerPage(1);
                      setDebouncedNbPerPage(1);
                    }
                  }, 1000);
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
