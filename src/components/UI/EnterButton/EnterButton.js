import React from "react";

import { AiOutlineEnter } from "react-icons/ai";
import styles from "./EnterButton.module.css";

const EnterButton = (props) => {
  return (
    <button className={styles.EnterButton} onClick={props.onPostComment}>
      <div className={styles.IconContainer}>
        <AiOutlineEnter />
      </div>
    </button>
  );
};

export default EnterButton;
