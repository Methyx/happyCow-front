// major imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// style
import "./App.css";

// pages
import Header from "./components/Header";
import Home from "./pages/Home";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faKey, faListAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faKey, faListAlt);

//
// App
//
function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
