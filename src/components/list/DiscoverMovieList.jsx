import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Cards from "../card/Card";

const DiscoverMovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortOption, setSortOption] = useState("popularity.desc");
  const [genre, setGenre] = useState("");
  const [bookmarkedMovies, setBookmarkedMovies] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedMovies");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  const fetchData = useCallback(async () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${sortOption}&page=${pageNumber}`;

    if (genre) {
      apiUrl += `&with_genres=${genre}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results && data.results.length) {
        setMovieList(data.results);
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log(apiUrl);
  }, [sortOption, pageNumber, genre]);

  useEffect(() => {
    fetchData();
  }, [fetchData, type]);

  const toggleBookmark = (movie) => {
    const updatedBookmarks = bookmarkedMovies.includes(movie.id)
      ? bookmarkedMovies.filter((id) => id !== movie.id)
      : [...bookmarkedMovies, movie.id];

    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmarks));
  };

  const nextPage = () => setPageNumber(pageNumber + 1);
  const previousPage = () => pageNumber > 1 && setPageNumber(pageNumber - 1);

  const handleReload = () => {
    window.location.reload();
  };

  const deleteMovie = (movieId) => {
    setMovieList((prevList) =>
      prevList.filter((movie) => movie.id !== movieId)
    );
  };

  const clearBookmarks = () => {
    localStorage.removeItem("bookmarkedMovies");
    setBookmarkedMovies([]);
  };

  const handleCreateMovie = (title) => {
    const createdMovie = {
      id: new Date().getTime(),
      original_title: "Movie Create Data",
      title: title || "Dummy Movie Title",
      overview: "This is a dummy overview of the movie.",
      release_date: "2024-01-01",
      poster_path: "/9w0Vh9eizfBXrcomiaFWTIPdboo.jpg",
    };

    setMovieList((prevList) => [createdMovie, ...prevList]);
  };

  const updateMovie = (movieId) => {
    const updatedMovieList = movieList.map((movie) =>
      movie.id === movieId
        ? {
            ...movie,
            original_title: "Movie Update Data",
            title: "Updated Dummy Movie Title",
            overview: "This is an updated dummy overview of the movie.",
            release_date: "2024-12-31",
            poster_path: "/30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
          }
        : movie
    );

    setMovieList(updatedMovieList);
  };
  return (
    <>
      <div className="movie__list">
        <div className="header__container">
          <h2 className="list__title">
            {(type ? type : "Home").toUpperCase()}
          </h2>
          <div className="sort__container">
            <button className="reload__button" onClick={handleReload}>
              Update Live Data
            </button>
            <label htmlFor="sort">Sort by: </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popularity.desc">Popularity (High to Low)</option>
              <option value="popularity.asc">Popularity (Low to High)</option>
              <option value="vote_average.desc">Rating (High to Low)</option>
              <option value="vote_average.asc">Rating (Low to High)</option>
              <option value="release_date.desc">Release Date (Newest)</option>
              <option value="release_date.asc">Release Date (Oldest)</option>
            </select>
          </div>

          <div className="filter__container">
            <label htmlFor="genre">Filter by Genre: </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
              <option value="27">Horror</option>
            </select>
          </div>

          <div className="create__container">
            <button onClick={handleCreateMovie}>Create Movie</button>
          </div>
          <div className="clear_bookmark_container">
            <button onClick={clearBookmarks}>Clear All Bookmarks</button>
          </div>
        </div>

        <div className="list__cards">
          {movieList.map((movie) => (
            <div className="grid" key={movie.id}>
              <Cards movie={movie} />
              <div className="button__container">
                <button onClick={() => toggleBookmark(movie)}>
                  {bookmarkedMovies.includes(movie.id)
                    ? "UnBookmark"
                    : "Bookmark"}
                </button>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                <button onClick={() => updateMovie(movie.id)}>
                  Update
                </button>{" "}
              </div>
            </div>
          ))}
        </div>

        <Pagination nextPage={nextPage} previousPage={previousPage} />
      </div>
    </>
  );
};

export default DiscoverMovieList;
