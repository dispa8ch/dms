import Dispa8chTable from "@/lib/table/Dispa8chTable";
import Dispa8chTableRow from "@/lib/table/Dispa8chTableRow";
import React, { useState } from "react";
import styles from "@/pages/dashboard/components/style/Index.module.css";
import Dispa8chDropDown from "@/lib/inputs/Dispa8chDropDown";

function DashboardSideBar() {
  const [recent, setRecent] = useState({
    hour: {
      selected: "last-24hr",
      data: [
        {
          label: "Last 24hr",
          value: "last-24hr",
        },
        {
          label: "Last 7d",
          value: "last-7d",
        },
      ],
    },
    range: {
      selected: "less-5000",
      data: [
        {
          label: "< 5,000",
          value: "less-5000",
        },
        {
          label: "< 100,000",
          value: "less-100000",
        },
      ],
    },
    order: {
      selected: "a-z",
      data: [
        {
          label: "A - Z",
          value: "a-z",
        },
        {
          label: "Z - A",
          value: "z-a",
        },
      ],
    },
  });
  const [selected, setSelected] = useState("assigned");
  const rows = Array.from({ length: 5 }, (s, i) => {
    return (
      <Dispa8chTableRow
        key={i}
        one={i + 1}
        two="Miracle Tony"
        three={<span style={{ color: "green" }}>Active</span>}
        four={<button>Edit</button>}
      />
    );
  });
  return (
    <section className={styles.side_bar}>
      <Dispa8chTable
        headers={[]}
        type="collapsed"
        title="Recent Orders"
        count={rows.length}
        action={() => {}}
        rightNode={
          <div className={styles.grid_top}>
            <Dispa8chDropDown
              value={recent.range.selected}
              onChange={(val) => {}}
              options={recent.range.data}
            />
            <Dispa8chDropDown
              value={recent.hour.selected}
              onChange={(val) => {}}
              options={recent.hour.data}
            />
            <Dispa8chDropDown
              value={recent.order.selected}
              onChange={(val) => {}}
              options={recent.order.data}
            />
          </div>
        }
      >
        {rows}
      </Dispa8chTable>
      <Dispa8chTable
        headers={[]}
        type="collapsed"
        title="Pending Deliveries"
        count={rows.length}
        action={() => {}}
        rightNode={
          <Dispa8chDropDown
            value={selected}
            onChange={(val) => {}}
            options={[
              {
                label: "Unassigned",
                value: "unassigned",
              },
              {
                label: "Assigned",
                value: "assigned",
              },
            ]}
          />
        }
      >
        {rows}
      </Dispa8chTable>
    </section>
  );
}

export default DashboardSideBar;
