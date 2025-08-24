import { Outlet } from "react-router-dom";
import styles from "@/layouts/styles/Index.module.css";
import Header from "./Header";
import SideBar from "./SideBar";
import { ApiServiceProvider } from "@/contexts/ApiServiceContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ModalProvider from "@/contexts/ModalContext";
import OrderProvider from "@/contexts/OrderContext";

export default function AppLayout() {
  return (
    <ToastProvider>
      <OrderProvider>
        <ModalProvider>
          <ApiServiceProvider>
            <div className={styles.app_layout}>
              <Header />
              <main className={styles.app_grid}>
                <SideBar />
                <section className={styles.app_content}>
                  <Outlet />
                </section>
              </main>
            </div>
          </ApiServiceProvider>
        </ModalProvider>
      </OrderProvider>
    </ToastProvider>
  );
}
