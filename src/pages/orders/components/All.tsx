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
import { formatStatus } from "@/utils/formatter";
import Dispa8chDropDown from "@/lib/inputs/Dispa8chDropDown";
import { GeneralIcons } from "@/lib/icons/general";
import { DropDownIcons } from "@/lib/icons/drop_down_icons";
import { useFetch } from "@/hooks/useFetch";
import CreateModal from "./CreateModal";
import Dispa8chActionDrop from "@/lib/inputs/Dispa8chActionDrop";
import AssignModal from "./AssignModal";
import { useModal } from "@/hooks/useModal";
import { useOrder } from "@/hooks/useOrder";

function All() {
  const { setOpen, setKey } = useModal();
  const { setOrder: setPrevOrder } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);
  const { data, loading, refetch } = useFetch<Order[]>(
    apiRoutes.order.fetchAll,
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
        <EmptyScreen />
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
                    ...(o.order_status.toLowerCase() !== "cancelled"
                      ? [
                          {
                            label: "Assign Rider",
                            value: "view-details",
                            extra: DropDownIcons.user_plus,
                            action: () => {
                              setOpen(true);
                              setKey("assign-rider");
                              setOrder(o);
                            },
                          },
                        ]
                      : []),
                    ...(o.order_status !== "cancelled"
                      ? [
                          {
                            label: "Edit Order",
                            value: "edit-order",
                            extra: DropDownIcons.pen,
                            action: () => {
                              setPrevOrder(o);
                              setOpen(true);
                              setKey("create-order");
                            },
                          },
                        ]
                      : []),
                    ...(o.order_status !== "cancelled"
                      ? [
                          {
                            label: "Cancel Order",
                            value: "view-details",
                            extra: DropDownIcons.cancel_circle,
                            action: () => {},
                          },
                        ]
                      : []),
                  ]}
                />
              }
            />
          ))}
        </Dispa8chTable>
      )}
      <CreateModal refetch={refetch} />
      <AssignModal
        refetch={refetch}
        orderId={order?.id ?? ""}
        orderNumber={order?.order_number ?? ""}
      />
    </section>
  );
}

export default All;
