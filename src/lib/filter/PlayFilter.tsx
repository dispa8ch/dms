import React, { useState } from "react";
import FilterPanel from "./FilterPanel";
import styles from "@/lib/filter/style/Index.module.css";
import { GeneralIcons } from "../icons/general";

function PlayFilter({ title, sections: _sections }: Dispa8chFilter) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <section
      className={styles.filter}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
      }}
    >
      {/* <span className={styles.icon}>{GeneralIcons.filter}</span> */}
      <small className={styles.btn_title}>Filter</small>
      {/* {open && (
        <FilterPanel
          activeValue=""
          onChange={() => {}}
          title={title}
          sections={[]}
        />
      )} */}
    </section>
  );
}

export default PlayFilter;
