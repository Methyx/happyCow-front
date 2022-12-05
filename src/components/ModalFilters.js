import { useEffect, useState } from "react";

import Switch from "@mui/material/Switch";
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
}) => {
  document.body.style.overflow = "hidden";
  const [textInput, setTextInput] = useState("");
  // context : advanced filters
  const [titleOnly, setTitleOnly] = useState(false);
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
  // const [miniRating, setMiniRating] = useState(0);
  const [starColor, setStarColor] = useState([
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
  ]);

  const [isReady, setIsReady] = useState(false);

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
      setTitleOnly,
      setIsMiniRating,
      setMiniRating,
      setFavoritesOnly
    );
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isMiniRating) {
      const newStarColor = [...starColor];
      for (let i = 0; i <= 5; i++) {
        if (i <= miniRating) {
          newStarColor[i] = "gold";
        } else {
          newStarColor[i] = "gray";
        }
      }
      setStarColor(newStarColor);
    }
  }, [isReady]);

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
        <div className="input">
          <input
            type="text"
            placeholder="search"
            value={textInput}
            onChange={(event) => {
              setTextInput(event.target.value);
            }}
          />
          <div className="search-in">
            <p>Search in :</p>
            <p>
              <span style={{ color: titleOnly ? "gray" : "black" }}>
                Name & Description{" "}
              </span>
              <FormControlLabel
                control={
                  <Switch
                    checked={titleOnly}
                    onChange={(event) => {
                      setTitleOnly(event.target.checked);
                    }}
                  />
                }
              />
              <span style={{ color: titleOnly ? "black" : "gray" }}>
                Name Only
              </span>
            </p>
          </div>
        </div>
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
                  label={typeIcons("veg-option")}
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
                      if (!event.target.checked) {
                        setMiniRating(0);
                        setStarColor(["gray", "gray", "gray", "gray", "gray"]);
                      } else {
                        setMiniRating(1);
                        setStarColor(["gold", "gray", "gray", "gray", "gray"]);
                      }
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
                      color: isMiniRating ? starColor[item] : "lightgray",
                    }}
                    onClick={() => {
                      if (isMiniRating) {
                        const newStarColor = [...starColor];
                        for (let i = 0; i <= 5; i++) {
                          if (i <= item) {
                            newStarColor[i] = "gold";
                          } else {
                            newStarColor[i] = "gray";
                          }
                        }
                        setStarColor(newStarColor);
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
                  titleOnly,
                  isMiniRating,
                  miniRating,
                  favoritesOnly
                );
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
