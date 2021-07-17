import React from "react";

import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
  const redirectToPage = () => {
    const moviedData = {
      source: props.movieData.source,
      name: props.movieData.name,
      releaseYear: props.movieData.releaseYear,
      genres: props.movieData.genres,
      synopsis: props.movieData.synopsis,
      id: props.movieData.id,
    };
    props.onSaveMovieData(moviedData);
  };

  return (
    <div className={styles.MovieCardContainer}>
      <div className={styles.MovieCard}>
        <div className={styles.ImageContainer}>
          <img className={styles.Image} src={props.src} alt="" />
        </div>
        <div className={styles.HoverInfo}>
          <div className={styles.Rating}>
            <div className={styles.IconContainer}>
              <BsFillStarFill />
            </div>
            <p className={styles.RatingNum}>{props.rating}</p>
          </div>
          <div className={styles.Genres}>
            {props.genres.map((genre) => {
              return (
                <p
                  className={styles.Genre}
                  key={props.rating * Math.random() + Math.random()}
                >
                  {genre}
                </p>
              );
            })}
          </div>

          <Link
            to="single_movie"
            className={styles.Button}
            onClick={redirectToPage}
          >
            <p className={styles.LinkMore}>More</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
