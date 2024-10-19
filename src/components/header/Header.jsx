import { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import imdbLogo from "../../assets/imdb_logo.png";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src={imdbLogo}
            alt=""
          />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
        <Link to="/search" style={{ textDecoration: "none" }}>
          <span>Search</span>
        </Link>
        <Link to="/bookmark" style={{ textDecoration: "none" }}>
          <span>Bookmark</span>
        </Link>
        <div className="theme-toggle">
          <span className="mode-icon">{theme === "light" ? "🌞" : "🌜"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
