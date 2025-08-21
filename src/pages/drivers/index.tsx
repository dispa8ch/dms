import DashboardLayout from "@/layouts/DashboardLayout";
import TabLayout from "@/lib/tab/TabLayout";
import React, { useState } from "react";
import RenderTab from "./util/RenderTab";
import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import { GeneralIcons } from "@/lib/icons/general";
import SearchInput from "@/lib/search/SearchInput";
import { useModal } from "@/hooks/useModal";

function Riders() {
  const { setOpen } = useModal();
  const [currentTab, setCurrentTab] = useState<Tab>({
    label: "",
    value: "rider-list",
  });

  return (
    <DashboardLayout
      pageTitle="Riders"
      rightContent={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <SearchInput placeholder="Search riders..." />
          <Dispa8chButton
            label="New Driver"
            type="primary"
            onClick={(e) => {
              e?.preventDefault();
              setOpen(true);
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
            label: "Rider List",
            value: "rider-list",
          },
          {
            label: "Daily Payment",
            value: "daily-payment",
          },
        ]}
        defaultTab="Rider List"
        onTabChange={(tab) => setCurrentTab(tab)}
      >
        <RenderTab tab={currentTab.value} />
      </TabLayout>
    </DashboardLayout>
  );
}

export default Riders;
