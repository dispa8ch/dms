import React, { useState, useMemo } from "react";
import LineChart from "./LineChart";
import styles from "@/lib/charts/style/Index.module.css";
import Util from "@/utils/Util";
import { ChartIcons } from "./icon";

// Define the expected structure for generic T
type BaseChartData = {
  date: string | Date;
  value: number;
};

type Dispa8chChartProps<T extends BaseChartData> = {
  data: T[];
  title?: string;
};

function Dispa8chChart<T extends BaseChartData>({
  data,
  title = "Dispa8ch Report",
}: Dispa8chChartProps<T>) {
  const [filter, setFilter] = useState<"day" | "month" | "year">("day");
  const [open, setOpen] = useState(false);

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
      value: "day" as const,
    },
    {
      label: "Month",
      value: "month" as const,
    },
    {
      label: "Year",
      value: "year" as const,
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

      <LineChart labels={labels.reverse()} dataPoints={values.reverse()} />
    </div>
  );
}

export default Dispa8chChart;
