import React from "react";
import styles from "@/lib/table/style/Index.module.css";

function Dispa8chTable({ headers, children }: Dispa8chTable) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default Dispa8chTable;
