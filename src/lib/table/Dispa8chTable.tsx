import React from "react";
import styles from "@/lib/table/style/Index.module.css";

function Dispa8chTable({
  headers,
  children,
  type = "main",
  title,
  action,
  rightNode,
  count,
}: Dispa8chTable) {
  return (
    <div className={styles.tableWrapper}>
      {type === "collapsed" && (
        <div className={styles.head}>
          <div className={styles.left}>
            <h5>{title}</h5>
            <span>{count}</span>
          </div>
          {rightNode}
        </div>
      )}
      <table className={type === "main" ? styles.table : styles.collapsed}>
        {type !== "collapsed" && (
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>{children}</tbody>
      </table>
      {action && (
        <button className={styles.view_all} onClick={action}>
          View All
        </button>
      )}
    </div>
  );
}

export default Dispa8chTable;
