import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./Card.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import 'react-loading-skeleton/dist/skeleton.css';


const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!movie) return null;

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme baseColor="#202020" highlightColor="#000">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${
                movie.poster_path || ""
              }`}
              alt={movie.original_title || "Movie Poster"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x450";
              }}
            />
            <div className="cards__overlay">
              <div className="card__title">
                {movie.original_title || "Untitled"}
              </div>
              <div className="card__runtime">
                {movie.release_date || "Release Date Unavailable"}
                <span className="card__rating">
                  {movie.vote_average || "N/A"} <i className="fas fa-star" />
                </span>
              </div>
              <div className="card__description">
                {movie.overview
                  ? movie.overview.slice(0, 118) + "..."
                  : "No description available."}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

Cards.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    original_title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
};

export default Cards;
