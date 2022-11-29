// major imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// style
import "./App.css";

// pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";

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
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zoom/:id" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
