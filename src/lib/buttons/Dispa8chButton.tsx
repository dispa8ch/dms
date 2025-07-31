import React from "react";
import styles from "./style/Index.module.css";
import { Link } from "react-router-dom";

function Dispa8chButton({
  label = "Click",
  color,
  type = "primary",
  icon,
  disabled,
  loading,
  link_type,
  path,
  size = "medium",
  buttonStyle,
  ...rest
}: Dispa8chButton) {
  return type === "link" ? (
    <Link to={path ?? ""} className={`${styles[type]}`} style={buttonStyle}>
      {label}
    </Link>
  ) : (
    <button
      className={`${styles.button} ${styles[type]} ${
        loading || disabled ? styles.disabled : ""
      } ${styles[`${size}`]}`}
      disabled={disabled || loading}
      {...rest}
      style={buttonStyle}
    >
      {loading ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          {icon ?? null}
          {label}
        </>
      )}
    </button>
  );
}

export default Dispa8chButton;
