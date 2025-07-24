import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import { AUTH_ROUTES } from "@/routes/RoutePaths";
import React, { useState } from "react";
import styles from "@/pages/auth/style/Index.module.css";
import { Link } from "react-router-dom";
import { GeneralIcons } from "@/lib/icons/general";
import { useRegister } from "@/contexts/RegisterContext";
import StepOne from "./step_one";
import StepTwo from "./step_two";
import Util from "@/utils/Util";

function Register() {
  const business = useRegister();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const disabled =
    !Util.isValidEmail(business.business_email) ||
    !Util.isValidPassword(business.user.user_password);

  return (
    <section className={styles.auth_page}>
      <div className={styles.logo_wrapper}>{GeneralIcons.page_logo}</div>
      <form action="">
        <div className={styles.form_wrapper}>
          <h2>Create your Account</h2>
          {step === 1 ? <StepOne /> : step === 2 ? <StepTwo /> : null}

          {step === 2 ? (
            <Dispa8chButton
              style={{ width: "100%", height: "3rem", marginTop: "2rem" }}
              label="Create your account"
              disabled={disabled || loading}
              loading={loading}
              onClick={(e) => {
                e.preventDefault();
                // handleSubmit();
              }}
              variant="primary"
            />
          ) : (
            <div
              style={{
                marginTop: "1rem",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Dispa8chButton
                label="Next"
                icon={GeneralIcons.arrow_right_long}
                variant="text"
                disabled={
                  !Util.isAllValid([
                    business.user.first_name,
                    business.user.last_name,
                    business.user.user_email,
                    business.user.user_password,
                  ])
                }
                onClick={(e) => {
                  e.preventDefault();
                  setStep((prev) => (prev === 2 ? 2 : prev + 1));
                }}
              />
            </div>
          )}
        </div>
      </form>
      <p>
        Have account? <Link to={AUTH_ROUTES.LOGIN}>Sign in</Link>
      </p>
    </section>
  );
}

export default Register;
