import React from "react";
import styles from "./style/Index.module.css";
import { GeneralIcons } from "../icons/general";

function Dispa8chDateInput({
  label = "Select Date",
  value,
  onChange,
  name,
  required,
  withTime = true,
}: Dispa8chDateInput) {
  return (
    <Wrapper label={label} required={required}>
      <div className={styles.inputContainer}>
        <input
          type={withTime ? "datetime-local" : "date"}
          className={styles.input}
          value={value}
          name={name}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <span className={styles.calendarIcon}>{GeneralIcons.calendar}</span>
      </div>
    </Wrapper>
  );
}

function Wrapper({
  children,
  label,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
  label: string;
}) {
  return (
    <div className={styles.date}>
      <label className={styles.label}>
        {label}
        {required ? <span>*</span> : null}
      </label>
      {children}
    </div>
  );
}

export default Dispa8chDateInput;
