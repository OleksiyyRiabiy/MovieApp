import React from "react";
import MovieCard from "../MovieCard/MovieCard";

import styles from "./Movies.module.css";

const Movies = (props) => {
  const saveMovieData = (enteredMovieData) => {
    const movieData = { ...enteredMovieData };
    props.onGetMovieInfo(movieData);
  };

  return (
    <div className={styles.MoviesContainer}>
      <div className={styles.Movies}>
        {props.currentMovies.map((movie) => {
          return (
            <MovieCard
              src={movie.medium_cover_image}
              genres={movie.genres}
              rating={movie.rating}
              onSaveMovieData={saveMovieData}
              movieData={{
                source: movie.large_cover_image,
                name: movie.title,
                releaseYear: movie.year,
                genres: movie.genres,
                synopsis: movie.synopsis,
                id: movie.id,
              }}
              key={movie.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
