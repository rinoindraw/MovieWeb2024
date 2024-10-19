import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Cards from "../card/Card";

const MovieListType = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [bookmarkedMovies, setBookmarkedMovies] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedMovies");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    
    const fetchData = async () => {
      let apiUrl = `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=${apiKey}&language=en-US&page=${pageNumber}`;

      console.log(apiUrl);

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovieList(data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type, pageNumber]);

  const nextPage = () => setPageNumber(pageNumber + 1);
  const previousPage = () => pageNumber > 1 && setPageNumber(pageNumber - 1);

  const toggleBookmark = (movie) => {
    const updatedBookmarks = bookmarkedMovies.includes(movie.id)
      ? bookmarkedMovies.filter((id) => id !== movie.id)
      : [...bookmarkedMovies, movie.id];

    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmarks));
  };

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
              </div>
            </div>
          ))}
        </div>
        <Pagination nextPage={nextPage} previousPage={previousPage} />
      </div>
    </>
  );
};

export default MovieListType;
