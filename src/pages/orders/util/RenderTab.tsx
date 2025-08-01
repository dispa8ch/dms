import React from "react";
import All from "../components/All";
import Unassigned from "../components/Unassigned";

function RenderTab({ tab }: { tab: string }) {
  switch (tab) {
    case "all":
      return <All />;
    case "unassigned":
      return <Unassigned />;
    // case "my-competitions":
    //   return <MyCompetitions />;
    // case "competitions-you-are-in":
    //   return <CompetitionsYouAreIn />;
    default:
      return <All />;
  }
}

export default RenderTab;
