import Dispa8chTable from "@/lib/table/Dispa8chTable";
import Dispa8chTableRow from "@/lib/table/Dispa8chTableRow";
import React from "react";

function DashboardSideBar() {
  return (
    <section>
      <Dispa8chTable headers={["ID", "Name", "Status", "Actions"]}>
        <Dispa8chTableRow
          one="1"
          two="Miracle Tony"
          three={<span style={{ color: "green" }}>Active</span>}
          four={<button>Edit</button>}
        />
        <Dispa8chTableRow
          one="2"
          two="Ada Obi"
          three={<span style={{ color: "gray" }}>Inactive</span>}
          four={<button>View</button>}
        />
        <Dispa8chTableRow
          one="2"
          two="Ada Obi"
          three={<span style={{ color: "gray" }}>Inactive</span>}
          four={<button>View</button>}
        />
        <Dispa8chTableRow
          one="2"
          two="Ada Obi"
          three={<span style={{ color: "gray" }}>Inactive</span>}
          four={<button>View</button>}
        />
        <Dispa8chTableRow
          one="2"
          two="Ada Obi"
          three={<span style={{ color: "gray" }}>Inactive</span>}
          four={<button>View</button>}
        />
      </Dispa8chTable>
    </section>
  );
}

export default DashboardSideBar;
