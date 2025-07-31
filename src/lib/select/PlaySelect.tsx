import React, { useState } from "react";
import styles from "@/lib/select/style/Index.module.css";
import { GeneralIcons } from "../icons/general";

function PlaySelect({
  label,
  options,
  defaultValue = "Select option",
}: Dispa8chSelect) {
  const [selected, setSelected] = useState<{
    label: string | number;
    value: string | number;
  } | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <div
      className={styles.play_select}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
      }}
    >
      <div>
        <span>{label ?? null}</span>
        <span>{selected ? selected.label : defaultValue}</span>
      </div>
      <span>{GeneralIcons.chevron_right}</span>
      {open && (
        <ul className={styles.options}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.option}
              onClick={(e) => {
                e.stopPropagation();
                setSelected((prev) => ({
                  ...prev,
                  label: option.label,
                  value: option.value,
                }));
                setOpen((prev) => !prev);
              }}
            >
              {/* <span className={styles.icon}>{option.icon ?? null}</span> */}
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlaySelect;
