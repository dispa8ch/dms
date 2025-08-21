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
  disabled,
}: Dispa8chInput) {
  const [inputValue, setValue] = useState<string | number>(value ?? "");
  const [visible, setVisible] = useState(false);

  function handleOnchange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    let newValue = Util.removeWhitespace(e.target.value);

    if (type === "currency") {
      newValue = Util.formatCurrencyInput(newValue);
      setValue(newValue);
      onChange?.(newValue.replace(/,/g, ""));
      return;
    }

    setValue(newValue);
    onChange?.(newValue);
  }

  function allowOnlyNumbers(e: React.KeyboardEvent<HTMLInputElement>) {
    const invalidKeys = ["e", "E", "+", "-", ".", ",", " "];
    const allowedControlKeys = [
      "Backspace",
      "Tab",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    const isCtrlCombo = e.ctrlKey || e.metaKey; // Allow Ctrl+C, Ctrl+V, Cmd+C, etc.

    if (
      invalidKeys.includes(e.key) ||
      (!/^\d$/.test(e.key) &&
        !allowedControlKeys.includes(e.key) &&
        !isCtrlCombo)
    ) {
      e.preventDefault();
    }
  }

  function handlePaste(
    e:
      | React.ClipboardEvent<HTMLInputElement>
      | React.ClipboardEvent<HTMLTextAreaElement>
  ) {
    const text = e.clipboardData.getData("text");
    const isValid = type === "currency" ? /^[\d,.]+$/ : /^\d+$/;
    if (!isValid.test(text)) {
      e.preventDefault();
    }
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
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
          />
          <span onClick={() => setVisible(!visible)}>
            {visible ? GeneralIcons.eye_open : GeneralIcons.eye_close}
          </span>
        </Wrapper>
      ) : type === "number" ? (
        <Wrapper label={label} required={required}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onKeyDown={allowOnlyNumbers}
            placeholder={placeholder}
            className={styles.input_normal}
            onChange={handleOnchange}
            value={inputValue}
            onPaste={handlePaste}
            autoComplete="text"
            disabled={disabled}
          />
        </Wrapper>
      ) : type === "currency" ? (
        <Wrapper label={label} required={required}>
          <input
            type="text"
            inputMode="decimal"
            pattern="[\d,]*"
            placeholder={placeholder}
            className={styles.input_normal}
            onChange={handleOnchange}
            value={inputValue}
            onPaste={handlePaste}
            autoComplete="off"
            disabled={disabled}
          />
        </Wrapper>
      ) : type === "textarea" ? (
        <Wrapper label={label} required={required}>
          <textarea
            placeholder={placeholder}
            className={styles.text_area}
            onChange={handleOnchange}
            value={inputValue}
            onPaste={handlePaste}
            autoComplete="off"
            disabled={disabled}
          ></textarea>
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
