import React, { useState } from "react";
import styles from "@/lib/buttons/style/Index.module.css";

function Dispa8chToggleButton({
  value,
  defaultValue = false,
  onToggle,
  disabled = false,
  label,
  className = "",
  size = "md",
  id,
  loading = false,
}: Dispa8chToggleButton) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = typeof value === "boolean";
  const active = isControlled ? value : internalValue;

  const toggle = () => {
    if (disabled) return;

    const newValue = !active;
    if (!isControlled) setInternalValue(newValue);
    onToggle?.(newValue);
  };
  return (
    <button
      type="button"
      id={id}
      className={`${styles.toggle} ${styles[size]} ${
        active ? styles.active : ""
      } ${disabled ? styles.disabled : ""} ${className}`}
      onClick={toggle}
      disabled={disabled}
      aria-pressed={active}
      aria-label={label}
    >
      <span
        className={`${styles.icon} ${loading ? styles.loading : ""}`}
      ></span>
    </button>
  );
}

export default Dispa8chToggleButton;
