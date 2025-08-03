import React from "react";
import styles from "@/lib/containers/style/TwinValue.module.css";

function TwinValue({
  one,
  two,
}: {
  one: string | number;
  two: string | number;
}) {
  return (
    <div className={styles.twin_value}>
      <strong>{one}</strong>
      <small>{two}</small>
    </div>
  );
}

export default TwinValue;
