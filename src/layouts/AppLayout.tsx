import { GeneralIcons } from "@/lib/icons/general";
import { APP_ROUTES } from "@/routes/RoutePaths";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "@/layouts/styles/Index.module.css";

export default function AppLayout() {
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
    <div className={styles.app_layout}>
      <header className={styles.app_header}>
        <div className={styles.app_header_left}>
          <span>{GeneralIcons.logo}</span>
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
      <main className={styles.app_grid}>
        <nav className={styles.app_nav}>
          {tabs.map((tab, i) => (
            <Link to={tab.path} tabIndex={i}>
              {location.pathname === tab.path ? tab.active_icon : tab.icon}
            </Link>
          ))}
        </nav>
        <section className={styles.app_content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
