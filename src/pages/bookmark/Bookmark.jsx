import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../../components/card/Card";
import Header from "../../components/header/Header";

const Bookmark = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const bookmarkedMovieIds =
      JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];
    const fetchBookmarkedMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;

      const movieData = await Promise.all(
        bookmarkedMovieIds.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
          ).then((response) => response.json())
        )
      );
      setBookmarkedMovies(movieData);
    };

    fetchBookmarkedMovies();
  }, []);

  return (
    <div>
      <Header />
      <div className="movie__list">
        <h2 className="list__title">Bookmarked Movies</h2>
        <div className="list__cards">
          {bookmarkedMovies.length === 0 ? (
            <p>No bookmarked movies found.</p>
          ) : (
            bookmarkedMovies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Cards movie={movie} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
