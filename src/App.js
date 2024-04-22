import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductDetails from "./pages/Details";
import { Products } from "./pages/Products";
import { Footer } from "./layout/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/singup" element={<SignUp />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
