import React, { useState, useEffect } from "react";
import EnterButton from "../UI/EnterButton/EnterButton";

import { AiOutlineCloseCircle } from "react-icons/ai";

import styles from "./SingleMoviePage.module.css";

const SingleMoviePage = () => {
  const [comments, setComments] = useState([]);

  const [enteredComment, setEnteredComment] = useState("");

  const [movieData] = useState({
    ...JSON.parse(localStorage.getItem("movie")),
  });

  const onPostComment = () => {
    setComments([...comments, enteredComment]);
    setEnteredComment("");
  };

  const onInputChange = (event) => {
    setEnteredComment(event.target.value);
  };

  const onRemoveComment = (commentRemove) => {
    const commentsCopy = [...comments];

    let filteredComments = commentsCopy.filter(
      (comment) => comment !== commentRemove
    );

    setComments([...filteredComments]);
    localStorage.setItem(
      `comments for ${movieData.name}`,
      JSON.stringify([...filteredComments])
    );
  };

  useEffect(() => {
    /*  setMovieData(JSON.parse(localStorage.getItem("movie"))); */
    const commentsFromLocalStorage = localStorage.getItem(
      `comments for ${movieData.name}`
    )
      ? JSON.parse(localStorage.getItem(`comments for ${movieData.name}`))
      : [];
    if (commentsFromLocalStorage.length !== 0) {
      setComments(commentsFromLocalStorage);
    }
  }, [movieData.name]);

  useEffect(() => {
    if (comments.length !== 0) {
      localStorage.setItem(
        `comments for ${movieData.name}`,
        JSON.stringify([...comments])
      );
    }
  }, [comments, movieData]);

  return (
    <div className={styles.SingleMovieContainer}>
      <div className={styles.SingleMovie}>
        <div className={styles.ImageContainer}>
          <img className={styles.Image} src={movieData.source} alt="" />
        </div>
        <div className={styles.MovieInfo}>
          <p className={styles.Name}>{movieData.name}</p>
          <p className={styles.ReleaseDate}>{movieData.releaseYear}</p>
          <div className={styles.Genres}>
            <ul className={styles.List}>
              {movieData.genres
                ? movieData.genres.map((genre) => (
                    <li
                      key={movieData.id * Math.random()}
                      className={styles.Item}
                    >
                      {genre}
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className={styles.Sinopsis}>
            <p className={styles.SinopsisName}>Synopsis</p>
            <p className={styles.SinopsisContent}>{movieData.synopsis}</p>
          </div>
          <div className={styles.CommentSection}>
            <p className={styles.SinopsisName}>Comments</p>
            {comments.map((comment) => (
              <div
                key={Math.random() * Math.random()}
                className={styles.Comment}
              >
                <p className={styles.CommentContent}>{comment}</p>
                <div
                  className={styles.CloseIconContainer}
                  onClick={() => onRemoveComment(comment)}
                >
                  <AiOutlineCloseCircle />
                </div>
              </div>
            ))}

            <div className={styles.InputContainer}>
              <input
                type="text"
                placeholder="Leave a comment"
                onChange={onInputChange}
                className={styles.Input}
                value={enteredComment}
              />
              <EnterButton
                onPostComment={enteredComment ? onPostComment : undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMoviePage;
