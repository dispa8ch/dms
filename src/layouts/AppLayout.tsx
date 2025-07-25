import { Outlet } from "react-router-dom";
import styles from "@/layouts/styles/Index.module.css";
import Header from "./Header";
import SideBar from "./SideBar";

export default function AppLayout() {
  return (
    <div className={styles.app_layout}>
      <Header />
      <main className={styles.app_grid}>
        <SideBar />
        <section className={styles.app_content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
