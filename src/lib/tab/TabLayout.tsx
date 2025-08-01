import React, { useEffect, useState } from "react";
import styles from "@/lib/tab/style/Index.module.css";
function TabLayout({ tabs, children, onTabChange, defaultTab }: TabLayout) {
  const [activeTab, setActiveTab] = useState<Tab>(
    defaultTab ? tabs.find((t) => t.label === defaultTab) ?? tabs[0] : tabs[0]
  );

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  return (
    <section className={styles.tab_layout}>
      <div className={styles.top}>
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={activeTab.value === tab.value ? styles.active : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.icon && <span className="tab-icon">{tab.icon}</span>}
              <span className="tab-label">{tab.label}</span>
              {tab.receipt && <span>{tab.receipt}</span>}
            </button>
          ))}
        </div>
      </div>

      <section className={styles.contents}>{children}</section>
    </section>
  );
}

export default TabLayout;
