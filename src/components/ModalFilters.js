import { useEffect, useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import categoriesIcons from "../functions/categoriesIcons";
import typeIcons from "../functions/typeIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// functions
import {
  loadContextFilters,
  saveContextFilters,
} from "../functions/handleContextFilters";

// style
import "../style/modalFilters.css";

const ModalFilters = ({
  setModalFiltersVisible,
  token,
  setModalLoginVisible,
  setReloadPage,
}) => {
  document.body.style.overflow = "hidden";

  // context : advanced filters

  const [restaurants, setRestaurants] = useState(true);
  const [vegan, setVegan] = useState(true);
  const [vegetarian, setVegetarian] = useState(true);
  const [vegOption, setVegOption] = useState(true);
  const [healthStore, setHealthStore] = useState(true);
  const [vegStore, setVegStore] = useState(true);
  const [iceCream, setIceCream] = useState(true);
  const [others, setOthers] = useState(true);
  const [miniRating, setMiniRating] = useState(0);

  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const [isMiniRating, setIsMiniRating] = useState(false);
  // const [starColor, setStarColor] = useState([
  //   "gray",
  //   "gray",
  //   "gray",
  //   "gray",
  //   "gray",
  // ]);

  // const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadContextFilters(
      setRestaurants,
      setHealthStore,
      setVegStore,
      setIceCream,
      setOthers,
      setVegan,
      setVegetarian,
      setVegOption,
      setIsMiniRating,
      setMiniRating,
      setFavoritesOnly
    );
    // setIsReady(true);
  }, []);

  // useEffect(() => {
  //   if (isMiniRating) {
  //     for (let i = 0; i < 5; i++) {
  //       if (i <= miniRating) {
  //         starColor[i] = "gold";
  //       } else {
  //         starColor[i] = "gray";
  //       }
  //     }
  //   }
  //   console.log("MiniRating : ", miniRating);
  // }, [isReady, isMiniRating, miniRating]);

  return (
    <div className="modalFilters-root">
      <div
        className="modalFilters"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="close"
          onClick={() => {
            setModalFiltersVisible(false);
            document.body.style.overflow = "auto";
          }}
        >
          X
        </button>
        <div className="two-columns">
          <div className="left-side">
            <div className="restaurants">
              <FormControlLabel
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon="utensils"
                      style={{
                        backgroundColor: "var(--happyCow-color)",
                        borderRadius: "50%",
                        borderWidth: 2,
                        color: "white",
                        fontSize: "25px",
                        padding: "9px",
                      }}
                    />
                    <span style={{ marginLeft: "10px" }}> Restaurant</span>
                  </div>
                }
                control={
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
                    checked={restaurants}
                    onChange={(event) => {
                      setRestaurants(event.target.checked);
                    }}
                  />
                }
              />
              <div className="restaurants-types">
                <FormControlLabel
                  label={typeIcons("vegan")}
                  checked={vegan}
                  onChange={(event) => {
                    setVegan(event.target.checked);
                  }}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                      disabled={!restaurants}
                    />
                  }
                />
                <FormControlLabel
                  label={typeIcons("vegetarian")}
                  checked={vegetarian}
                  onChange={(event) => {
                    setVegetarian(event.target.checked);
                  }}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                      disabled={!restaurants}
                    />
                  }
                />
                <FormControlLabel
                  label={typeIcons("veg-options")}
                  checked={vegOption}
                  onChange={(event) => {
                    setVegOption(event.target.checked);
                  }}
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                      disabled={!restaurants}
                    />
                  }
                />
              </div>
            </div>
            <br />
            <FormControlLabel
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {categoriesIcons(1)}{" "}
                  <span style={{ marginLeft: "10px" }}> Health Store</span>
                </div>
              }
              control={
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
                  checked={healthStore}
                  onChange={(event) => {
                    setHealthStore(event.target.checked);
                  }}
                />
              }
            />
            <FormControlLabel
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {categoriesIcons(2)}{" "}
                  <span style={{ marginLeft: "10px" }}> Veg Store</span>
                </div>
              }
              control={
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
                  checked={vegStore}
                  onChange={(event) => {
                    setVegStore(event.target.checked);
                  }}
                />
              }
            />
            <FormControlLabel
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {categoriesIcons(12)}{" "}
                  <span style={{ marginLeft: "10px" }}> Ice Cream</span>
                </div>
              }
              control={
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
                  checked={iceCream}
                  onChange={(event) => {
                    setIceCream(event.target.checked);
                  }}
                />
              }
            />
            <FormControlLabel
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {categoriesIcons(99)}{" "}
                  <span style={{ marginLeft: "10px" }}> Other</span>
                </div>
              }
              control={
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
                  checked={others}
                  onChange={(event) => {
                    setOthers(event.target.checked);
                  }}
                />
              }
            />
          </div>
          <div className="right-side">
            <div className="rating">
              <FormControlLabel
                label="Minimum rating :"
                control={
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
                    checked={isMiniRating}
                    onChange={(event) => {
                      setIsMiniRating(event.target.checked);
                      setMiniRating(0);
                    }}
                  />
                }
              />
              {[0, 1, 2, 3, 4].map((item) => {
                return (
                  <FontAwesomeIcon
                    key={item}
                    className="star"
                    icon="star"
                    style={{
                      color: isMiniRating
                        ? item <= miniRating
                          ? "gold"
                          : "gray"
                        : "lightgray",
                    }}
                    onClick={() => {
                      if (isMiniRating) {
                        setMiniRating(item);
                      } else {
                        setIsMiniRating(true);
                        setMiniRating(item);
                      }
                    }}
                  />
                );
              })}
            </div>
            <div className="favorites-only">
              <FormControlLabel
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon="heart"
                      style={{ color: "red", fontSize: "25px" }}
                    />{" "}
                    <span style={{ marginLeft: "10px" }}>
                      Favorites only {!token && "(need login)"}
                    </span>
                  </div>
                }
                control={
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 35 } }}
                    checked={favoritesOnly}
                    onChange={(event) => {
                      if (!token) {
                        setModalLoginVisible(true);
                      } else {
                        setFavoritesOnly(event.target.checked);
                      }
                    }}
                  />
                }
              />
            </div>
            <button
              className="validation"
              onClick={() => {
                saveContextFilters(
                  restaurants,
                  healthStore,
                  vegStore,
                  iceCream,
                  others,
                  vegan,
                  vegetarian,
                  vegOption,
                  isMiniRating,
                  miniRating,
                  favoritesOnly
                );
                setReloadPage(true);
                setModalFiltersVisible(false);
                document.body.style.overflow = "auto";
              }}
            >
              Save Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalFilters;
