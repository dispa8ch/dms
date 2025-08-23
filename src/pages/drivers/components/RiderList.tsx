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
import Dispa8chActionDrop from "@/lib/inputs/Dispa8chActionDrop";
import CreateModal from "./CreateModal";
import { useApp } from "@/contexts/AppContext";

function RiderList() {
  const { companyId } = useApp();
  const { data, loading, refetch } = useFetch<Rider[]>(
    apiRoutes.rider.fetchByCompanyId(companyId),
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
          headers={["Name", "Phone", "Email", "Vehicle", "Status", " "]}
        >
          {data.map((rider, i) => (
            <Dispa8chTableRow
              key={i}
              one={
                // <div className={styles.check}>
                //   <Dispa8chCheckbox
                //     id={o.id}
                //     checked={isChecked(o.id)}
                //     onChange={(checked) => toggleCheckbox(o.id, checked)}
                //   />
                //   <span>{o.order_number.toUpperCase()}</span>
                // </div>
                rider.rider_first_name + " " + rider.rider_last_name
              }
              two={rider.rider_phone}
              three={rider.rider_email}
              four={rider.rider_vehicle}
              five={rider.rider_availability ? "Active" : "Inactive"}
              six={
                <Dispa8chActionDrop
                  options={[
                    {
                      label: "View Details",
                      value: "view-details",
                      extra: DropDownIcons.eye,
                      action: () => {},
                    },
                    {
                      label: "Edit Rider",
                      value: "view-details",
                      extra: DropDownIcons.pen,
                      action: () => {},
                    },
                    {
                      label: "Delete Rider",
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

export default RiderList;
