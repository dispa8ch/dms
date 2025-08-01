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
}: Dispa8chSelect) {
  const [selectedValue, setSelectedValue] =
    React.useState<Dispa8chDropDownOption>({
      label: "",
      value: "",
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
      className={`${styles.drop} ${className || ""}`}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
      }}
    >
      <span className={styles.value}>{selectedValue.label}</span>

      {open && (
        <div className={styles.options}>
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
