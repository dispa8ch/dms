import { GeneralIcons } from "@/lib/icons/general";
import React from "react";
import styles from "@/pages/loaders/style/Index.module.css";

function Loading() {
  return (
    <div className={styles.page_loader}>
      <div className={styles.large}></div>
      <div className={styles.medium}></div>
      <div className={styles.small}></div>
      <span className={styles.page_loader_icon}>
        {GeneralIcons.page_loader}
      </span>
    </div>
  );
}

export default Loading;
