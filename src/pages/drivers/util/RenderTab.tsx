import React from "react";
import RiderList from "../components/RiderList";
import DailyPayment from "../components/DailyPayment";

function RenderTab({ tab }: { tab: string }) {
  switch (tab) {
    case "rider-list":
      return <RiderList />;
    case "daily-payment":
      return <DailyPayment />;
    // case "my-competitions":
    //   return <MyCompetitions />;
    // case "competitions-you-are-in":
    //   return <CompetitionsYouAreIn />;
    default:
      return <RiderList />;
  }
}

export default RenderTab;
