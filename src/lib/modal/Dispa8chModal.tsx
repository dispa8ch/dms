import React from "react";
import styles from "@/lib/modal/style/Index.module.css";
import Dispa8chButton from "../buttons/Dispa8chButton";
import { GeneralIcons } from "../icons/general";

function Dispa8chModal({
  title,
  onClose,
  visible,
  actionButtonPayload,
  children,
  replaceBottom,
  size = "medium",
}: Dispa8chModal) {
  return (
    <section className={`${styles.modal} ${visible ? styles.visible : ""} `}>
      <div className={`${styles.modal_wrapper} ${styles[size]}`}>
        <div className={styles.head}>
          <h4>{title}</h4>
          <button onClick={onClose}>{GeneralIcons.close}</button>
        </div>
        <div className={styles.children}>{children}</div>
        {replaceBottom ?? null}
        {actionButtonPayload && (
          <div className={styles.bottom}>
            <Dispa8chButton type="secondary" onClick={onClose} label="Cancel" />
            <Dispa8chButton
              type="primary"
              onClick={actionButtonPayload.action}
              label={actionButtonPayload.label}
              icon={actionButtonPayload.icon}
              disabled={actionButtonPayload.disabled}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Dispa8chModal;
