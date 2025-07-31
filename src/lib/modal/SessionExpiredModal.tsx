import { GeneralIcons } from "@/lib/icons/general";
import React, { useEffect, useState } from "react";
import styles from "@/lib/modal/style/Index.module.css";
import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import { AUTH_ROUTES } from "@/routes/RoutePaths";

function SessionExpiredModal() {
  const [sec, setSec] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSec((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.assign(AUTH_ROUTES.LOGIN); // Optional auto redirect
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup when component unmounts
  }, []);

  return (
    <div className={styles.session_modal}>
      <div className={styles.content}>
        <span>{GeneralIcons.session_ui}</span>
        <h2>Session Timeout!</h2>
        <p>
          You have been logged out due to inactivity. <br /> Not to worry all
          your progress has been saved, login to continue.
          <span>
            Logging out in {sec} second{sec !== 1 ? "s" : ""}
          </span>
        </p>
        <Dispa8chButton
          label="Login again"
          onClick={() => {
            window.location.assign(AUTH_ROUTES.LOGIN);
          }}
          type="primary"
          size="large"
          buttonStyle={{ width: "100%", marginTop: "2rem", height: 40 }}
        />
      </div>
    </div>
  );
}

export default SessionExpiredModal;
