import React from "react";
import All from "../components/All";
import Unassigned from "../components/Unassigned";
import Completed from "../components/Completed";
import Cancelled from "../components/Cancelled";
import Pending from "../components/Pending";

function RenderTab({ tab }: { tab: string }) {
  switch (tab) {
    case "all":
      return <All />;
    case "unassigned":
      return <Unassigned />;
    case "completed":
      return <Completed />;
    case "cancelled":
      return <Cancelled />;
    case "pending":
      return <Pending />;
    default:
      return <All />;
  }
}

export default RenderTab;
