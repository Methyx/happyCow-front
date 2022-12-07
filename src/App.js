// major imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// style
import "./App.css";

// pages
import Header from "./components/Header";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import RestaurantImages from "./pages/RestaurantImages";
import User from "./pages/User";
import ModalPhoto from "./components/ModalPhoto";
import ModalLogin from "./components/ModalLogin";
import AroundMe from "./pages/AroundMe";
import Footer from "./components/Footer";

// functions
import handleUser from "./functions/handleUser";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faStar,
  faLocationDot,
  faPhone,
  faLink,
  faPeopleArrows,
  faEye,
  faUpload,
  faFilter,
  faUtensils,
  faHeart,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";
import ModalFilters from "./components/ModalFilters";
library.add(
  faBars,
  faStar,
  faLocationDot,
  faPhone,
  faLink,
  faPeopleArrows,
  faEye,
  faUpload,
  faFilter,
  faUtensils,
  faHeart,
  faHandPointLeft
);

//
// App
//
function App() {
  // Init
  let favorites = [];
  if (Cookies.get("happyCowFavorites")) {
    favorites = JSON.parse(Cookies.get("happyCowFavorites"));
  }

  // UseSates
  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);
  const [imageInModal, setImageInModal] = useState("");
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [modalFiltersVisible, setModalFiltersVisible] = useState(false);
  const [reloadHome, setReloadHome] = useState(false);

  const [user, setUser] = useState({
    token: Cookies.get("happyCowToken") || null,
    username: Cookies.get("happyCowUser") || null,
    favorites: favorites || null,
    avatar: null,
  });

  return (
    <Router>
      <Header
        setModalLoginVisible={setModalLoginVisible}
        user={user}
        setUser={setUser}
        handleUser={handleUser}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setModalFiltersVisible={setModalFiltersVisible}
              reloadHome={reloadHome}
              setReloadHome={setReloadHome}
              setModalLoginVisible={setModalLoginVisible}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/zoom/:id"
          element={
            <RestaurantDetails
              setModalLoginVisible={setModalLoginVisible}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/photos/:id"
          element={
            <RestaurantImages
              setModalPhotoVisible={setModalPhotoVisible}
              setImageInModal={setImageInModal}
            />
          }
        />
        <Route path="/user" element={<User user={user} setUser={setUser} />} />
        <Route path="/AroundMe" element={<AroundMe />} />
      </Routes>
      <Footer />
      {modalPhotoVisible && (
        <ModalPhoto
          imageInModal={imageInModal}
          setModalPhotoVisible={setModalPhotoVisible}
        />
      )}
      {modalFiltersVisible && (
        <ModalFilters
          setModalFiltersVisible={setModalFiltersVisible}
          token={user.token}
          setModalLoginVisible={setModalLoginVisible}
          setReloadHome={setReloadHome}
        />
      )}
      {modalLoginVisible && (
        <ModalLogin
          setModalLoginVisible={setModalLoginVisible}
          setUser={setUser}
        />
      )}
    </Router>
  );
}

export default App;
