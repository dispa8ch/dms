import React, { useState, useMemo } from "react";
import LineChart from "./LineChart";
import styles from "@/lib/charts/style/Index.module.css";
import Util from "@/utils/Util";
import { ChartIcons } from "./icon";

type ChartPoint = {
  date: string; // ISO date string
  value: number;
};

type Dispa8chChartProps = {
  data: ChartPoint[];
  title?: string;
};

function Dispa8chChart({
  data,
  title = "Dispa8ch Report",
}: Dispa8chChartProps) {
  const [filter, setFilter] = useState<"day" | "month" | "year">("day");
  const [open, setOpen] = useState(true);
  const { labels, values } = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      day: filter === "day" ? "numeric" : undefined,
      month: filter === "year" ? "short" : "long",
      year: "numeric",
    });

    const grouped: Record<string, number> = {};

    data.forEach((item) => {
      const dateKey = formatter.format(new Date(item.date));
      grouped[dateKey] = (grouped[dateKey] || 0) + item.value;
    });

    const labels = Object.keys(grouped);
    const values = Object.values(grouped);

    return { labels, values };
  }, [data, filter]);

  function handleFilterChange(
    newFilter: "day" | "month" | "year",
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    setFilter(newFilter);
    setOpen(false);
  }

  const obj = [
    {
      label: "Day",
      value: "day" as typeof filter,
    },
    {
      label: "Month",
      value: "month" as typeof filter,
    },
    {
      label: "Year",
      value: "year" as typeof filter,
    },
  ];

  return (
    <div className={styles.chart}>
      <div className={styles.head}>
        <h2>{title}</h2>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className={styles.drop_down}
        >
          {Util.capitalize(filter)}
          <span>{ChartIcons.drop_down}</span>
          {open && (
            <div className={styles.items}>
              {obj.map((o, i) => (
                <button key={i} onClick={(e) => handleFilterChange(o.value, e)}>
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <LineChart labels={labels} dataPoints={values} />
    </div>
  );
}

export default Dispa8chChart;
