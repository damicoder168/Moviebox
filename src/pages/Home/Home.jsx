import "./Home.css";
import { Hero, MovieCard, SearchBar } from "../../components";
import logo from "../../assets/Logo.png";
import Menu from "../../assets/Menu.png";
import { Link } from "react-router-dom";
import arrow from "../../assets/arrow-right.png";
import { useState, useEffect } from "react";
import { getInitialMovies } from "../../utils/fetchFromApi";

const Navbar = ({ handleSearch, handleChange, handleSubmit, movieTitle }) => {
 
  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <SearchBar

        handleSearch={handleSearch}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        movieTitle={movieTitle}
      />
      <div className="app__signIn">
        <p>Sign in</p>
        <img src={Menu} alt="menu" />
      </div>
    </nav>
  );
};

const Home = ({ handleSearch, handleChange, handleSubmit, movieTitle }) => {
  const [movie, setMovie] = useState([]);
  
  useEffect(() => {
    getInitialMovies().then((data) => {
      setMovie(data?.results);
    });
  }, []);

  return (
    <>
      <div className="app__home">
        <Navbar
          handleSearch={handleSearch}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          movieTitle={movieTitle}
        />
        <Hero />
      </div>
      <div className="padding-movie">
        <div className="feature">
          <h3>Featured Today</h3>
          <div className="see__more">
            <p>See More</p>
            <img src={arrow} alt="arrow__right" />
          </div>
        </div>
        <div className="movie__card__container">
          {movie &&
            movie.map((item) => <MovieCard key={item?.id} item={item} />)}
        </div>
      
      </div>
    </>
  );
};

export default Home;
