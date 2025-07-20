import React, { useState } from "react";
import { GeneralIcons } from "@/lib/icons/general";
import { APP_ROUTES, AUTH_ROUTES } from "@/routes/RoutePaths";
import { Link, useNavigate } from "react-router-dom";
import styles from "@/pages/auth/style/Index.module.css";
import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import Util from "@/utils/Util";
import { useApiService } from "@/contexts/ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";

function Login() {
  const navigate = useNavigate();
  const api = useApiService();
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const disabled =
    !Util.isValidEmail(credentials.email) ||
    !Util.isValidPassword(credentials.password);

  const handleSubmit = async () => {
    setLoading(true);

    api
      .post(apiRoutes.user.login, {
        user_password: credentials.password,
        user_email: credentials.email,
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
          <h2>Login your Account</h2>
          <div className={styles.input_wrapper}>
            <Dispa8chInput
              label="Email Address"
              type="email"
              placeholder="example@gmail.com"
              value={credentials.email}
              onChange={(value) => {
                setCredentials((prev) => ({ ...prev, email: value as string }));
              }}
            />
          </div>
          <div className={styles.input_wrapper}>
            <Dispa8chInput
              label="Password"
              type="password"
              value={credentials.password}
              placeholder="enter your password"
              onChange={(value) => {
                setCredentials((prev) => ({
                  ...prev,
                  password: value as string,
                }));
              }}
            />
          </div>
          <Dispa8chButton
            style={{ marginTop: "0.5rem" }}
            label="Forgot password?"
            path=""
            variant="link"
          />
          <Dispa8chButton
            style={{ width: "100%", height: "3rem", marginTop: "2rem" }}
            label="Login account"
            disabled={disabled || loading}
            loading={loading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            variant="primary"
          />
        </div>
      </form>
      <p>
        Don’t have an account? <Link to={AUTH_ROUTES.REGISTER}>Sign Up</Link>
      </p>
    </section>
  );
}

export default Login;
