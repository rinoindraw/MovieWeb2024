import Home from './pages/home/Home'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieType from "./pages/movieType/MovieType"
import DetailMovie from "./pages/detail/DetailMovie"
import MovieSearch from "./pages/movieSearch/MovieSearch"
import Bookmark from "./pages/bookmark/Bookmark"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home />} />
        <Route path='/*' element={<h1>Error Page</h1>} />
        <Route path='movies/:type' element={<MovieType />} />
        <Route path='movie/:id' element={<DetailMovie />} />
        <Route path='/search' element={<MovieSearch />} />
        <Route path='/bookmark' element={<Bookmark />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
