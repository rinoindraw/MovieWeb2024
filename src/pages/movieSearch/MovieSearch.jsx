import { useEffect, useState } from "react";
import Cards from "../../components/card/Card";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import Pagination from "../../components/pagination/Pagination";
import "../../components/movieList/MovieList.css";

const MovieSearch = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [bookmarkedMovies, setBookmarkedMovies] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedMovies");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      let apiUrl = "";

      if (searchQuery) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchQuery
        )}&page=${pageNumber}`;
      } else {
        apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNumber}`;
      }

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results) {
          setMovieList(data.results);
        } else {
          setMovieList([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      console.log(apiUrl);
    };

    fetchData();
  }, [searchQuery, pageNumber]);

  const toggleBookmark = (movie) => {
    const updatedBookmarks = bookmarkedMovies.includes(movie.id)
      ? bookmarkedMovies.filter((id) => id !== movie.id)
      : [...bookmarkedMovies, movie.id];

    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmarks));
  };

  const nextPage = () => setPageNumber(pageNumber + 1);
  const previousPage = () => setPageNumber(pageNumber - 1);

  const deleteMovie = (movieId) => {
    setMovieList((prevList) =>
      prevList.filter((movie) => movie.id !== movieId)
    );
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
      <Header />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="movie__list">
        <div className="list__cards">
          {movieList.map((movie) => (
            <div className="grid" key={movie.id}>
              <Cards movie={movie} key={movie.id} />
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
                {/* Tombol baru */}
              </div>
            </div>
          ))}
        </div>
        <Pagination nextPage={nextPage} previousPage={previousPage} />
      </div>
    </>
  );
};

export default MovieSearch;
