import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "@/layouts/styles/Index.module.css";
import { GeneralIcons } from "@/lib/icons/general";
import { APP_ROUTES } from "@/routes/RoutePaths";
import Account from "./components/Account";

function Header() {
  const [drop, setDrop] = useState(false);
  const [company, setCompany] = useState<CompanyHalf>(
    JSON.parse(localStorage.getItem("companyInfo") ?? "{}")
  );
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

  useEffect(() => {
    setCompany(
      (prev) =>
        JSON.parse(localStorage.getItem("companyInfo") ?? "{}") as CompanyHalf
    );
  }, []);

  return (
    <header className={styles.app_header}>
      <div className={styles.app_header_left}>
        <span className={styles.logo}>{GeneralIcons.logo}</span>
        <div>
          <h2>{company.company_name}</h2>
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
        <div
          className={styles.app_header_right_user_profile}
          onClick={(e) => {
            e.stopPropagation();
            setDrop((prev) => !prev);
          }}
        >
          <span>AB</span>
        </div>
        {drop && (
          <Account
            fullName="KingTony Technologies"
            email="business@kingtonytech.it.com"
            image=""
          />
        )}
      </div>
    </header>
  );
}

export default Header;
