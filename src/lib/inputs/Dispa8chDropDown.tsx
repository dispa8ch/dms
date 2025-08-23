import React, { useEffect, useState } from "react";
import styles from "./style/Index.module.css";
import { GeneralIcons } from "../icons/general";

function Dispa8chDropDown({
  label,
  onChange,
  options,
  className,
  disabled,
  error,
  id,
  name,
  required,
  value,
  type = "small",
  direction = "down",
  dropStyles,
}: Dispa8chDropDown) {
  const [selectedValue, setSelectedValue] =
    React.useState<Dispa8chDropDownOption>({
      label: "",
      value: value || "",
    });
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setSelectedValue((prev) => {
      const newData = options.find((data) => data.value === value) ?? {
        label: "",
        value: "",
      };

      return newData;
    });
  }, [value]);
  return (
    <div
      className={`${styles.drop} ${className || ""} ${
        type === "large" ? styles.large : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
      }}
      style={dropStyles}
    >
      {label && (
        <label>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <span className={styles.value}>{selectedValue.label}</span>

      {open && (
        <div
          className={styles.options}
          style={
            direction === "down"
              ? { top: "100%" }
              : direction === "down-left"
              ? { top: "100%", left: 0 }
              : direction === "down-right"
              ? { top: "100%", right: 0 }
              : direction === "up-left"
              ? { bottom: 0, left: 0 }
              : direction === "up-right"
              ? { bottom: 0, right: 0 }
              : { bottom: 0 }
          }
        >
          {options.map((option, idx) => (
            <span
              key={idx}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent blur before this registers
                setSelectedValue(option); // Set selected value
                setOpen(false); // Close dropdown
                if (onChange) onChange(option); // Notify parent
              }}
              className={styles.option}
            >
              {option.extra ?? null}
              {option.label}
            </span>
          ))}
        </div>
      )}
      <span className={styles.drop_icon}>{GeneralIcons.drop_icon}</span>
    </div>
  );
}

export default Dispa8chDropDown;
