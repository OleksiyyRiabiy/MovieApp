import React from "react";

import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.Ring}>
      Loading
      <span className={styles.Span}></span>
    </div>
  );
};

export default Spinner;
