import React from "react";
import styles from "@/layouts/styles/Index.module.css";

function DashboardLayout({
  pageTitle,
  rightContent,
  children,
}: {
  pageTitle: string;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.dashboard_layout}>
      <div className={styles.top_bar}>
        <h1>{pageTitle}</h1>{" "}
        {rightContent && <div className={styles.right}>{rightContent}</div>}
      </div>
      <div className={styles.children}>{children}</div>
    </section>
  );
}

export default DashboardLayout;
