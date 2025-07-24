import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import { APP_ROUTES, AUTH_ROUTES } from "@/routes/RoutePaths";
import React, { useState } from "react";
import styles from "@/pages/auth/style/Index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GeneralIcons } from "@/lib/icons/general";
import { useRegister } from "@/contexts/RegisterContext";
import StepOne from "./step_one";
import StepTwo from "./step_two";
import Util from "@/utils/Util";
import { useApiService } from "@/contexts/ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";

function Register() {
  const navigate = useNavigate();
  const api = useApiService();
  const business = useRegister();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    api
      .post(apiRoutes.company.create, {
        companyName: business.companyName,
        email: business.business_email,
        country: business.country,
        city: business.city,
        phone: business.phone,
        address: business.address,
        logo: null,
        user: {
          first_name: business.user.first_name,
          last_name: business.user.last_name,
          user_email: business.user.user_email,
          user_password: business.user.user_password,
        },
      })
      .then((response) => {
        localStorage.setItem("companyData", JSON.stringify(response.data));
        localStorage.setItem("token", `${response.token}`);
        navigate(APP_ROUTES.DASHBOARD);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
              disabled={
                !Util.isAllValid([
                  business.companyName,
                  business.country,
                  business.city,
                  business.phone,
                ]) || loading
              }
              loading={loading}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
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
