import Util from "@/utils/Util";
import React, { useState } from "react";
import styles from "./style/Index.module.css";
import { GeneralIcons } from "../icons/general";

function Dispa8chSelect({
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
  loading,
  placeholder,
}: Dispa8chSelect) {
  const [selectedValue, setSelectedValue] =
    React.useState<Dispa8chSelectOption>({
      value: value || "",
      label: "",
    });
  const [open, setOpen] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<Dispa8chSelectOption[]>(options);
  return (
    <div className={`${styles.select} ${className || ""}`}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      {loading ? (
        <span>Loading...</span>
      ) : (
        <input
          type="text"
          className={styles.value}
          value={selectedValue.label}
          placeholder={placeholder}
          onChange={(e) => {
            setOpen((prev) => (prev = true));
            setSelectedValue((prev) => {
              const newValue = {
                label: e.target.value,
                value: e.target.value.split(" ").join("-").toLowerCase(),
              };
              return newValue;
            });
            setFiltered((prev) => {
              const newList = options.filter((val) =>
                val.label.toLowerCase().includes(e.target.value.toLowerCase())
              );
              return newList;
            });
          }}
          onFocus={() => setOpen((prev) => (prev = true))}
          onBlur={() => {
            setTimeout(() => setOpen(false), 100);
          }}
        />
      )}
      {open && (
        <div className={styles.options}>
          {filtered.map((option, idx) => (
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
              {option.extra ? (
                <img src={option.extra ?? null} alt={option.label} />
              ) : null}
              {option.label}
            </span>
          ))}
        </div>
      )}
      <span className={styles.drop_icon}>{GeneralIcons.select_drop}</span>
    </div>
  );
}

export default Dispa8chSelect;
