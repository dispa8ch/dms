import React, { useState } from "react";
import styles from "./style/Index.module.css";
import { GeneralIcons } from "../icons/general";

function Dispa8chActionDrop({
  // label,
  // onChange,
  options,
  className,
}: // disabled,
// error,
// id,
// name,
// required,
// value,
Dispa8chActionDrop) {
  // const [selectedValue, setSelectedValue] =
  //   React.useState<Dispa8chDropDownOption>({
  //     label: "",
  //     value: "",
  //   });
  const [open, setOpen] = useState<boolean>(false);
  // useEffect(() => {
  //   setSelectedValue((prev) => {
  //     const newData = options.find((data) => data.value === value) ?? {
  //       label: "",
  //       value: "",
  //     };

  //     return newData;
  //   });
  // }, [value]);

  return (
    <div
      className={`${styles.action_drop} ${className || ""}`}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
      }}
    >
      {GeneralIcons.ellispsis}

      {open && (
        <ul className={styles.options}>
          {options.map((option, idx) => (
            <li
              key={idx}
              // onMouseDown={(e) => {
              //   e.preventDefault(); // Prevent blur before this registers
              //   setSelectedValue(option); // Set selected value
              //   setOpen(false); // Close dropdown
              //   if (onChange) onChange(option); // Notify parent
              // }}
              onClick={() => option.action?.()}
              className={styles.option}
            >
              {option.extra && option.extra} <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
      {/* <span className={styles.drop_icon}>{GeneralIcons.drop_icon}</span> */}
    </div>
  );
}

export default Dispa8chActionDrop;
