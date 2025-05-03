import { Link } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="homepage">
        <h1>
          Shop with <span>confidence!</span>
        </h1>
        <p>Shop it till you drop it. There's something for everyone!</p>
        <Link to="/shop" className="homepage-shop-now-btn">
          Shop Now
        </Link>
      </div>
    </>
  );
}

export default App;
