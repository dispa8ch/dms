import { GeneralIcons } from "@/lib/icons/general";
import React from "react";
import styles from "@/components/empty/style/Index.module.css";

function EmptyScreen({
  title = "Nothing to Show",
  subtitle = "Records created in the platform will show up here.",
  icon,
}: {
  title?: string;
  subtitle?: string;
  icon?: string;
}) {
  return (
    <div className={styles.empty}>
      <span>{GeneralIcons.default_empty}</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default EmptyScreen;
