import EmptyScreen from "@/components/empty/EmptyScreen";
import { useApiService } from "@/contexts/ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";
import Dispa8chCheckbox from "@/lib/inputs/Dispa8chCheckbox";
import Dispa8chTable from "@/lib/table/Dispa8chTable";
import Dispa8chTableRow from "@/lib/table/Dispa8chTableRow";
import Util from "@/utils/Util";
import React, { useEffect, useState } from "react";
import styles from "@/pages/orders/components/style/Index.module.css";
import Loading from "@/pages/loaders/Loading";

function Unassigned() {
  const api = useApiService();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const isChecked = (id: string) => selectedIds.has(id);

  const toggleCheckbox = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      checked ? newSet.add(id) : newSet.delete(id);
      return newSet;
    });
  };

  const allSelected = orders.every((item) => selectedIds.has(item.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set()); // uncheck all
    } else {
      setSelectedIds(new Set(orders.map((item) => item.id))); // check all
    }
  };

  useEffect(() => {
    setLoading(true);
    api
      .get<Order[]>(apiRoutes.order.fetchByParams("unassinged"))
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section>
      <Dispa8chTable
        headers={[
          <div className={styles.check}>
            <Dispa8chCheckbox
              id="terms"
              checked={allSelected}
              onChange={toggleAll}
            />
            Order No.
          </div>,
          "Customer",
          "Pickup Location",
          "Delivery Location",
          "Amount",
          "Status",
          "Action",
        ]}
      >
        {Util.isEmpty(orders) ? (
          <EmptyScreen />
        ) : (
          orders.map((o, i) => (
            <Dispa8chTableRow
              key={i}
              one={
                <div className={styles.check}>
                  <Dispa8chCheckbox
                    id={o.id}
                    checked={isChecked(o.id)}
                    onChange={(checked) => toggleCheckbox(o.id, checked)}
                  />
                  <span>{o.order_number.toUpperCase()}</span>
                </div>
              }
              two={o.pickup_username}
              three={o.pickup_address}
              four={o.delivery_address}
              five={Util.formatCurrency(Number(o.delivery_fees), "ngn")}
              six={o.order_status}
              seven={<div></div>}
            />
          ))
        )}
      </Dispa8chTable>
    </section>
  );
}

export default Unassigned;
