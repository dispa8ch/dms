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
import { useFetch } from "@/hooks/useFetch";
import { DropDownIcons } from "@/lib/icons/drop_down_icons";
import Dispa8chActionDrop from "@/lib/inputs/Dispa8chActionDrop";
import { formatStatus } from "@/utils/formatter";
import CreateModal from "./CreateModal";

function Completed() {
  const { data, loading, refetch } = useFetch<Order[]>(
    apiRoutes.order.filter("completed"),
    []
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isChecked = (id: string) => selectedIds.has(id);

  const toggleCheckbox = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      checked ? newSet.add(id) : newSet.delete(id);
      return newSet;
    });
  };

  const allSelected = data.every((item) => selectedIds.has(item.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set()); // uncheck all
    } else {
      setSelectedIds(new Set(data.map((item) => item.id))); // check all
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section>
      {Util.isEmpty(data) ? (
        <EmptyScreen
          title="No Completed Orders"
          subtitle="Completed orders will show up here when they are available"
        />
      ) : (
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
          {data.map((o, i) => (
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
              six={formatStatus(o.order_status)}
              seven={
                <Dispa8chActionDrop
                  options={[
                    {
                      label: "View Details",
                      value: "view-details",
                      extra: DropDownIcons.eye,
                      action: () => {},
                    },
                    {
                      label: "Assign Rider",
                      value: "view-details",
                      extra: DropDownIcons.user_plus,
                      action: () => {},
                    },
                    {
                      label: "Edit Order",
                      value: "view-details",
                      extra: DropDownIcons.pen,
                      action: () => {},
                    },
                    {
                      label: "Cancel Order",
                      value: "view-details",
                      extra: DropDownIcons.cancel_circle,
                      action: () => {},
                    },
                  ]}
                />
              }
            />
          ))}
        </Dispa8chTable>
      )}
      <CreateModal refetch={refetch} />
    </section>
  );
}

export default Completed;
