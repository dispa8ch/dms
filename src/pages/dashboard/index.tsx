import DashboardLayout from "@/layouts/DashboardLayout";
import { DashboardAssets } from "@/lib/icons/dashboard_assets";
import React, { useEffect, useState } from "react";
import MainCard from "./components/MainCard";
import styles from "@/pages/dashboard/style/Index.module.css";
import MinorCard from "./components/MinorCard";
import Dispa8chChart from "@/lib/charts/Dispa8chChart";
import DashboardSideBar from "./components/sidebar";
import { useApiService } from "@/contexts/ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";
import Loading from "../loaders/Loading";

function Dashboard() {
  const api = useApiService();
  const [overview, setOverview] = React.useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const main_cards = [
    {
      title: "Total number of Orders",
      count: overview?.stats.total_orders ?? 0,
      icon: DashboardAssets.total_orders,
      className: "green",
    },
    {
      title: "Total number of Riders",
      count: overview?.stats.total_riders ?? 0,
      icon: DashboardAssets.total_riders,
      className: "orange",
    },
  ];
  const minor_cards = [
    {
      title: "Today's Deliveries",
      count: overview?.stats.total_sales ?? 0,
      className: "blue",
    },
    {
      title: "Completed Deliveries",
      count: overview?.stats.completed_deliveries ?? 0,
      className: "purple",
    },
    {
      title: "Assigned Riders",
      count: overview?.stats.assigned_riders ?? 0,
      className: "pinkish",
    },
  ];

  useEffect(() => {
    setLoading(true);
    api
      .get<DashboardData>(apiRoutes.company.overview)
      .then((res) => {
        setOverview(res.data);
        localStorage.setItem(
          "companyInfo",
          JSON.stringify(res.data?.companyInfo)
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <DashboardLayout pageTitle="Dashboard">
      <div className={styles.wrapper}>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.main_cards}>
              {main_cards.map((card) => (
                <MainCard {...card} />
              ))}
            </div>
            <div className={styles.minor_cards}>
              {minor_cards.map((card) => (
                <MinorCard {...card} />
              ))}
            </div>
          </div>
          <div>
            <Dispa8chChart
              data={
                overview?.monthlySales.map((data) => {
                  return {
                    date: data.month,
                    value: parseInt(data.total_sales),
                  };
                }) ?? []
              }
            />
          </div>
        </div>
        <DashboardSideBar
          recent_orders={overview?.recentOrders ?? []}
          in_transit={overview?.inTransitOrders ?? []}
          new_order={overview?.newOrders ?? []}
        />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
