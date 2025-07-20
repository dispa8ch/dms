import React from "react";
import styles from "./style/Index.module.css";
import { Link } from "react-router-dom";

function Dispa8chButton({
  label = "Click",
  color,
  children,
  variant = "primary",
  icon,
  disabled,
  loading,
  link_type,
  path,
  ...rest
}: Dispa8chButton) {
  return variant === "link" ? (
    <Link to={path ?? ""} className={`${styles[variant]}`}>
      {label}
    </Link>
  ) : (
    <button
      className={`${styles.button} ${styles[variant]} ${
        loading || disabled ? styles.disabled : ""
      }`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          {icon ?? null}
          {label}
          {children}
        </>
      )}
    </button>
  );
}

export default Dispa8chButton;
