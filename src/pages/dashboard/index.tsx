import DashboardLayout from "@/layouts/DashboardLayout";
import { DashboardAssets } from "@/lib/icons/dashboard_assets";
import React from "react";
import MainCard from "./components/MainCard";
import styles from "@/pages/dashboard/style/Index.module.css";
import MinorCard from "./components/MinorCard";
import Dispa8chChart from "@/lib/charts/Dispa8chChart";
import DashboardSideBar from "./components/sidebar";

function Dashboard() {
  const main_cards = [
    {
      title: "Total number of Orders",
      count: 15000,
      icon: DashboardAssets.total_orders,
      className: "green",
    },
    {
      title: "Total number of Riders",
      count: 15000,
      icon: DashboardAssets.total_riders,
      className: "orange",
    },
  ];
  const minor_cards = [
    {
      title: "Total number of Orders",
      count: 15000,
      icon: DashboardAssets.total_orders,
      className: "blue",
    },
    {
      title: "Total number of Riders",
      count: 15000,
      icon: DashboardAssets.total_riders,
      className: "purple",
    },
    {
      title: "Total number of Riders",
      count: 15000,
      icon: DashboardAssets.total_riders,
      className: "pinkish",
    },
  ];

  const sampleData = [
    { date: "2025-07-01", value: 30 },
    { date: "2025-07-01", value: 50 },
    { date: "2025-07-02", value: 40 },
    { date: "2025-07-20", value: 70 },
    { date: "2025-06-10", value: 100 },
    { date: "2025-01-05", value: 150 },
    { date: "2024-01-05", value: 90 },
  ];

  return (
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
            <Dispa8chChart data={sampleData} />
          </div>
        </div>
        <DashboardSideBar />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
