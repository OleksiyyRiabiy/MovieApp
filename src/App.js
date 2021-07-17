import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Movies from "./components/Movies/Movies";
import Pagination from "./components/Pagination/Pagination";
import Spinner from "./components/UI/Spinner/Spinner";

import { Switch, Route, Redirect } from "react-router-dom";
import SingleMoviePage from "./components/SingleMoviePage/SingleMoviePage";
import BackButton from "./components/UI/BackButton/BackButton";

const App = () => {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [moviesPerPage] = useState(8);

  const [isLoadedMovie, setIsLoadedMovie] = useState(
    localStorage.getItem("movie") ? true : false
  );

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?limit=40"
    );
    const parsedResponse = await response.json();
    setIsLoading(false);
    setMovies(parsedResponse.data.movies);
  };

  const onPaginateHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  const getMovieInfo = (movie) => {
    localStorage.setItem("movie", JSON.stringify(movie));
    console.log(JSON.parse(localStorage.getItem("movie")));
    setIsLoadedMovie(true);
  };

  const onResetMovie = () => {
    localStorage.removeItem("movie");
    setIsLoadedMovie(false);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  let routes = (
    <Switch>
      <Route path="/single_movie" render={() => <SingleMoviePage />} />
      <Route
        path="/"
        render={() => (
          <div className={styles.MoviesContainer}>
            <Movies
              currentMovies={currentMovies}
              onGetMovieInfo={getMovieInfo}
            />
          </div>
        )}
      />
      <Redirect to="/" />
    </Switch>
  );

  if (isLoading) {
    routes = <Spinner />;
  }

  let header = isLoadedMovie ? (
    <p className={styles.HeaderName}>
      {JSON.parse(localStorage.getItem("movie")).name}
    </p>
  ) : (
    <p className={styles.HeaderName}>Movies</p>
  );
  let contentHeader = isLoadedMovie ? (
    <BackButton onResetMovie={onResetMovie} />
  ) : (
    <Pagination
      moviesPerPage={moviesPerPage}
      totalMovies={movies.length}
      onPaginate={onPaginateHandler}
      currentPage={currentPage}
    />
  );

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        {header}
        {contentHeader}
      </header>
      {routes}
    </div>
  );
};

export default App;
