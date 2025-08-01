import React from "react";
import styles from "@/lib/search/style/Index.module.css";
import { GeneralIcons } from "../icons/general";

function SearchInput({
  placeholder = "Search...",
  icon: _icon,
  width,
}: SearchInput) {
  return (
    <div className={styles.search} style={{ width: `${width}%` }}>
      <span>{GeneralIcons.search}</span>
      <input type={"search"} placeholder={placeholder} />
    </div>
  );
}

export default SearchInput;
