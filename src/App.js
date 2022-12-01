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
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faBars,
  faStar,
  faLocationDot,
  faPhone,
  faLink,
  faPeopleArrows,
  faEye,
  faUpload
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
        <Route path="/" element={<Home />} />
        <Route path="/zoom/:id" element={<RestaurantDetails />} />
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
      </Routes>
      {modalPhotoVisible && (
        <ModalPhoto
          imageInModal={imageInModal}
          setModalPhotoVisible={setModalPhotoVisible}
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
