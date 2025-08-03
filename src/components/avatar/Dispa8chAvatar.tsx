import React from "react";
import styles from "@/components/avatar/style/Index.module.css";
import Util from "@/utils/Util";

function Dispa8chAvatar({
  image,
  name,
  size = "md",
  withValue = false,
}: {
  image: string;
  name: string;
  size: "lg" | "sm" | "md";
  withValue?: boolean;
}) {
  return withValue ? (
    <div className={styles.with_value}>
      <div
        className={`${styles.avatar} ${styles[size]}`}
        style={{ background: Util.generateDeepColor() }}
      >
        {!image ? (
          <span className={styles.placeholder}>{Util.getInitials(name)}</span>
        ) : (
          <img src={image} alt="" />
        )}

        <span></span>
      </div>
      <p>{name}</p>
    </div>
  ) : (
    <div
      className={`${styles.avatar} ${styles[size]}`}
      style={{ background: Util.generateDeepColor() }}
    >
      {!image ? (
        <span className={styles.placeholder}>{Util.getInitials(name)}</span>
      ) : (
        <img src={image} alt="" />
      )}

      <span></span>
    </div>
  );
}

export default Dispa8chAvatar;
