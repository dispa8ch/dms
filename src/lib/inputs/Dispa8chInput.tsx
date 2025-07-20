import Util from "@/utils/Util";
import React, { type ReactNode, useEffect, useState } from "react";
import styles from "./style/Index.module.css";
import { GeneralIcons } from "../icons/general";

function Dispa8chInput({
  label,
  type,
  placeholder,
  required,
  onChange,
  value,
}: Dispa8chInput) {
  const [inputValue, setValue] = useState<string | number>(value ?? "");
  const [visible, setVisible] = useState(false);

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Util.removeWhitespace(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  }

  useEffect(() => {
    setValue(value ?? "");
  }, [value]);

  return (
    <div>
      {type === "text" ? (
        <Wrapper label={label} required={required}>
          <input
            type="text"
            placeholder={placeholder}
            className={styles.input_normal}
            onChange={handleOnchange}
            value={inputValue}
            autoComplete="text"
          />
        </Wrapper>
      ) : type === "email" ? (
        <Wrapper label={label} required={required}>
          <input
            type="email"
            className={styles.input_normal}
            placeholder={placeholder}
            onChange={handleOnchange}
            value={inputValue}
            autoComplete="email"
          />
        </Wrapper>
      ) : type === "phone" ? (
        <Wrapper label={label} required={required} type="tel_wrapper">
          <div className={styles.c_code}>+234</div>
          <input
            type="tel"
            className={styles.phone_input}
            placeholder={placeholder}
            onChange={handleOnchange}
            value={inputValue}
            autoComplete="phone"
          />
        </Wrapper>
      ) : type === "password" ? (
        <Wrapper label={label} required={required} type="with_children">
          <input
            type={visible ? "text" : "password"}
            className={styles.input_normal}
            placeholder={placeholder}
            onChange={handleOnchange}
            value={inputValue}
          />
          <span onClick={() => setVisible(!visible)}>
            {visible ? GeneralIcons.eye_open : GeneralIcons.eye_close}
          </span>
        </Wrapper>
      ) : null}
    </div>
  );
}

function Wrapper({
  children,
  label,
  required,
  type,
}: {
  children: ReactNode;
  required?: boolean;
  label: string;
  type?: string;
}) {
  return (
    <div
      className={`${styles.input} ${
        type === "tel_wrapper" ? styles.tel_wrapper : styles[type ?? ""]
      }`}
    >
      <label className={styles.label}>
        {label}
        {required ? <span>*</span> : null}
      </label>
      {children}
    </div>
  );
}

export default Dispa8chInput;
