import React from "react";
import Parent from "./Parent";
import styles from "./style/Index.module.css";
import Dispa8chButton from "../buttons/Dispa8chButton";
import { GeneralIcons } from "@/lib/icons/general";

function ModalContainter({
  title = "Modal Title",
  children,
  action,
  actionText = "Click",
  onCancel,
  canceltext = "Cancel",
  visible,
  actionDiabled,
  actionLoading,
}: ModalContainer) {
  return (
    <Parent visible={visible}>
      <div className={styles.modal_container}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span onClick={onCancel}>{GeneralIcons.close}</span>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.action_buttons}>
          <Dispa8chButton
            variant="secondary"
            onClick={onCancel}
            label={canceltext}
          />
          <Dispa8chButton
            variant="primary"
            onClick={action}
            label={actionText}
            disabled={actionDiabled}
            loading={actionLoading}
          />
        </div>
      </div>
    </Parent>
  );
}

export default ModalContainter;
