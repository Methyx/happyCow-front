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

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faStar,
  faLocationDot,
  faPhone,
  faLink,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faStar, faLocationDot, faPhone, faLink, faPeopleArrows);

//
// App
//
function App() {
  // UseSates
  const [modalPhoto, setModalPhoto] = useState(false);
  const [imageInModal, setImageInModal] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zoom/:id" element={<RestaurantDetails />} />
        <Route
          path="/photos/:id"
          element={
            <RestaurantImages
              setModalPhoto={setModalPhoto}
              setImageInModal={setImageInModal}
            />
          }
        />
      </Routes>
      {modalPhoto && (
        <ModalPhoto imageInModal={imageInModal} setModalPhoto={setModalPhoto} />
      )}
    </Router>
  );
}

export default App;
