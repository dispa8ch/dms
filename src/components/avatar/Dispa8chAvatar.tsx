import React from "react";
import styles from "@/components/avatar/style/Index.module.css";
import Util from "@/utils/Util";

function Dispa8chAvatar({
  image,
  name,
  size = "md",
}: {
  image: string;
  name: string;
  size: "lg" | "sm" | "md";
}) {
  return (
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
