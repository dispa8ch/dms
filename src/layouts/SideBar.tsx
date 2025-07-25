import React from "react";
import styles from "@/layouts/styles/Index.module.css";
import { GeneralIcons } from "@/lib/icons/general";
import { APP_ROUTES } from "@/routes/RoutePaths";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const tabs = [
    {
      icon: GeneralIcons.dashboard,
      active_icon: GeneralIcons.dashboard_active,
      path: APP_ROUTES.DASHBOARD,
    },
    {
      icon: GeneralIcons.orders,
      active_icon: GeneralIcons.orders_active,
      path: APP_ROUTES.ORDERS,
    },
    {
      icon: GeneralIcons.riders,
      active_icon: GeneralIcons.riders_active,
      path: APP_ROUTES.RIDERS,
    },
    {
      icon: GeneralIcons.map,
      active_icon: GeneralIcons.map_active,
      path: APP_ROUTES.MAP,
    },
    {
      icon: GeneralIcons.reports,
      active_icon: GeneralIcons.reports_active,
      path: APP_ROUTES.REPORTS,
    },
  ];
  return (
    <nav className={styles.app_nav}>
      {tabs.map((tab, i) => (
        <Link to={tab.path} tabIndex={i}>
          {location.pathname === tab.path ? tab.active_icon : tab.icon}
        </Link>
      ))}
    </nav>
  );
}

export default SideBar;
