// major imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// style
import "./App.css";

// pages
import Header from "./components/Header";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import RestaurantImages from "./pages/RestaurantImages";
import ModalPhoto from "./components/ModalPhoto";
import ModalLogin from "./components/ModalLogin";

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
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faBars,
  faStar,
  faLocationDot,
  faPhone,
  faLink,
  faPeopleArrows,
  faEye
);

//
// App
//
function App() {
  // UseSates
  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);
  const [imageInModal, setImageInModal] = useState("");
  const [modalLoginVisible, setModalLoginVisible] = useState(false);

  return (
    <Router>
      <Header setModalLoginVisible={setModalLoginVisible} />
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
      </Routes>
      {modalPhotoVisible && (
        <ModalPhoto
          imageInModal={imageInModal}
          setModalPhotoVisible={setModalPhotoVisible}
        />
      )}
      {modalLoginVisible && (
        <ModalLogin setModalLoginVisible={setModalLoginVisible} />
      )}
    </Router>
  );
}

export default App;
