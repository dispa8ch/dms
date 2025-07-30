import React, { type ReactNode } from "react";
import styles from "./style/Index.module.css";

function Parent({
  children,
  visible,
}: {
  children: ReactNode;
  visible: boolean;
}) {
  return visible && <section className={styles.modal}>{children}</section>;
}

export default Parent;
