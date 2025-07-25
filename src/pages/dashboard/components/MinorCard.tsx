import Util from "@/utils/Util";
import React from "react";
import styles from "@/pages/dashboard/components/style/Index.module.css";

function MinorCard({ title, count, className }: MinorDashboardCard) {
  return (
    <div className={`${styles.minor_card} ${styles[className]}`}>
      <p>{title}</p>
      <strong>{Util.formatCounts(count)}</strong>
      <span className={styles.icon}></span>
    </div>
  );
}

export default MinorCard;
