import React from "react";
import { Link } from "react-router-dom";
import styles from "@/layouts/styles/Index.module.css";
import { GeneralIcons } from "@/lib/icons/general";
import { APP_ROUTES } from "@/routes/RoutePaths";

function Header() {
  const headerTabs = [
    {
      label: "Complaint",
      icon: GeneralIcons.complaint,
      active_icon: GeneralIcons.complaint_active,
      path: APP_ROUTES.COMPLAINTS,
    },
    {
      label: "Chatbox",
      icon: GeneralIcons.chat,
      active_icon: GeneralIcons.chat_active,
      path: APP_ROUTES.COMPLAINTS,
    },
    {
      label: "Support",
      icon: GeneralIcons.support,
      path: APP_ROUTES.COMPLAINTS,
      action: () => {},
    },
  ];

  return (
    <header className={styles.app_header}>
      <div className={styles.app_header_left}>
        <span className={styles.logo}>{GeneralIcons.logo}</span>
        <div>
          <h2>Sample Name</h2>
          <small>Powered by Dispa8ch</small>
        </div>
      </div>
      <div className={styles.app_header_right}>
        <div className={styles.app_header_right_links}>
          {headerTabs.map((t, i) => (
            <Link to={t.path} tabIndex={i}>
              {location.pathname === t.path ? t.active_icon : t.icon}
              <small>{t.label}</small>
            </Link>
          ))}
        </div>
        <div className={styles.app_header_right_user_profile}>
          <span>AB</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
