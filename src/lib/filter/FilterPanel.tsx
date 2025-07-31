"use client";

import React from "react";
import styles from "@/lib/filter/style/Index.module.css";

interface FilterPanelProps extends Dispa8chFilter {
  activeValue: string;
  onChange: (value: FilterItem[]) => void;
}

export default function FilterPanel({
  // activeValue,
  // onChange,
  sections,
  title = "Title",
}: FilterPanelProps) {
  // const [filtered, setFiltered] = useState<FilterItem[]>([]);
  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>{title}</h3>
      {sections.map((sec, idx) => (
        <section key={idx} className={styles.section}>
          <p>{sec.label}</p>
          <ul>
            {sec.section.map((item) => (
              <li key={item.id} onClick={() => {}}>
                {item.label}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
