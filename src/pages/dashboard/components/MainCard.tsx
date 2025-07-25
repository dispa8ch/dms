import Util from "@/utils/Util";
import React from "react";
import styles from "@/pages/dashboard/components/style/Index.module.css";

function MainCard({ title, icon, className, count }: MainDashboardCard) {
  return (
    <div className={`${styles.main_card} ${styles[className]}`}>
      <div className={styles.left}>
        <p>{title}</p>
        <strong>{Util.formatCounts(count)}</strong>
      </div>
      <span className={styles.icon}>{icon}</span>
    </div>
  );
}

export default MainCard;
