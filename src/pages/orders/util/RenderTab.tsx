import React from "react";

function RenderTab({ tab }: { tab: string }) {
  switch (tab) {
    // case "global-competitions":
    //   return <Global />;
    // case "public-competitions":
    //   return <Public />;
    // case "my-competitions":
    //   return <MyCompetitions />;
    // case "competitions-you-are-in":
    //   return <CompetitionsYouAreIn />;
    default:
      return <></>;
  }
}

export default RenderTab;
