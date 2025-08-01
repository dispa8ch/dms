import React from "react";
import styles from "./style/Index.module.css";

function Dispa8chCheckbox({
  id,
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  className = "",
}: Dispa8chCheckbox) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label htmlFor={id} className={`${styles.checkbox_wrapper} ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.hidden_checkbox}
      />
      <span
        className={`${styles.custom_checkbox} ${
          disabled ? styles.disabled : ""
        }`}
      />
      {label && <span className={styles.checkbox_label}>{label}</span>}
    </label>
  );
}

export default Dispa8chCheckbox;
