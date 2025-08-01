import DashboardLayout from "@/layouts/DashboardLayout";
import TabLayout from "@/lib/tab/TabLayout";
import React, { useState } from "react";
import RenderTab from "./util/RenderTab";
import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import { GeneralIcons } from "@/lib/icons/general";
import SearchInput from "@/lib/search/SearchInput";
import CreateModal from "./components/CreateModal";

function Orders() {
  const [openCreate, setOpenCreate] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>({
    label: "",
    value: "all",
  });

  return (
    <DashboardLayout
      pageTitle="Orders"
      rightContent={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <SearchInput placeholder="Search orders..." />
          <Dispa8chButton
            label="New Order"
            type="primary"
            onClick={(e) => {
              e?.preventDefault();
              setOpenCreate(true);
            }}
            icon={GeneralIcons.plus_filled_white}
            buttonStyle={{ fontSize: "0.9rem" }}
          />
        </div>
      }
    >
      <TabLayout
        tabs={[
          {
            label: "All orders",
            value: "all",
          },
          {
            label: "Unassigned",
            value: "unassigned",
          },
          {
            label: "Completed",
            value: "completed",
          },
          {
            label: "Cancelled",
            value: "cancelled",
          },
          {
            label: "Pending",
            value: "pending",
          },
        ]}
        defaultTab="All Orders"
        onTabChange={(tab) => setCurrentTab(tab)}
      >
        <RenderTab tab={currentTab.value} />
      </TabLayout>
      <CreateModal open={openCreate} setOpen={setOpenCreate} />
    </DashboardLayout>
  );
}

export default Orders;
