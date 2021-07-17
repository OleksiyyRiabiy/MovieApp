import React from "react";

import { AiOutlineRollback } from "react-icons/ai";

import { Link } from "react-router-dom";

import styles from "./BackButton.module.css";

const BackButton = (props) => {
  return (
    <Link to="/">
      <button className={styles.BackButton} onClick={props.onResetMovie}>
        <div className={styles.IconContainer}>
          <AiOutlineRollback />
        </div>
      </button>
    </Link>
  );
};

export default BackButton;
