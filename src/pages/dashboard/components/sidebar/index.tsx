import Dispa8chTable from "@/lib/table/Dispa8chTable";
import Dispa8chTableRow from "@/lib/table/Dispa8chTableRow";
import React, { useState } from "react";
import styles from "@/pages/dashboard/components/style/Index.module.css";
import Dispa8chDropDown from "@/lib/inputs/Dispa8chDropDown";
import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import { GeneralIcons } from "@/lib/icons/general";
import Util from "@/utils/Util";
import EmptyScreen from "@/components/empty/EmptyScreen";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/routes/RoutePaths";

function DashboardSideBar({
  recent_orders,
  in_transit,
  new_order,
}: {
  recent_orders: RecentOrder[];
  in_transit: InTransitOrder[];
  new_order: Order[];
}) {
  const navigate = useNavigate();
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
  console.log(Util.isEmpty(recent_orders));
  console.log("This is recent: ", recent_orders);

  return (
    <section className={styles.side_bar}>
      <div className={styles.new_order}>
        <h5>New Order</h5>
        <div className={styles.new_order_wrapper}>
          <div className={styles.header}>
            <p>{new_order[0]?.order_number.toUpperCase()}</p>
            <div className={styles.right}>
              <b>{Util.formatCurrency(+new_order[0]?.delivery_fees)}</b>
              <Dispa8chButton
                label="Assign"
                onClick={() => {}}
                type="outline"
                size="small"
                icon={GeneralIcons.plus_filled}
              />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.row}>
              <div className={styles.left}>
                <span className={styles.circle}></span>
                <div>
                  <p>{new_order[0]?.pickup_address}</p>
                  {/* <small>{new_order[0].pi}</small> */}
                </div>
              </div>
              <small>{new_order[0]?.pickup_time}</small>
            </div>

            <div className={styles.row}>
              <div className={styles.left}>
                <span className={styles.icon}>{GeneralIcons.location}</span>
                <div>
                  <p>{new_order[0]?.delivery_address}</p>
                  {/* <small>Lagos, Nigeria</small> */}
                </div>
              </div>
              <small>{new_order[0]?.delivery_time}</small>
            </div>
          </div>
        </div>
      </div>
      <Dispa8chTable
        headers={[]}
        type="collapsed"
        title="Recent Orders"
        count={recent_orders.length}
        action={() => {
          navigate(APP_ROUTES.ORDERS);
        }}
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
        {Util.isEmpty(recent_orders) ? (
          <EmptyScreen />
        ) : (
          recent_orders.map((d, i) => (
            <Dispa8chTableRow
              key={i}
              one={d.order_number}
              two={d.pickup_username}
              three={d.delivery_address}
              four={d.delivery_receiver_name}
              five={d.pickup_time}
            />
          ))
        )}
      </Dispa8chTable>
      <Dispa8chTable
        headers={[]}
        type="collapsed"
        title="Pending Deliveries"
        count={in_transit.length}
        action={() => {
          navigate(APP_ROUTES.ORDERS);
        }}
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
        {Util.isEmpty(in_transit) ? (
          <EmptyScreen />
        ) : (
          in_transit.map((d, i) => (
            <Dispa8chTableRow
              key={i}
              one={i + 1}
              two="Miracle Tony"
              three={<span style={{ color: "green" }}>Active</span>}
              four={<button>Edit</button>}
            />
          ))
        )}
      </Dispa8chTable>
    </section>
  );
}

export default DashboardSideBar;
