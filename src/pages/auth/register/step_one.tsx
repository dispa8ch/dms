import React, { useState } from "react";
import styles from "@/pages/auth/style/Index.module.css";
import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import { useRegister } from "@/contexts/RegisterContext";

function StepOne() {
  const business = useRegister();
  return (
    <div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="First name"
          type="text"
          placeholder="John"
          value={business?.user.first_name}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              user: { ...prev.user, first_name: value as string },
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Last name"
          type="text"
          placeholder="Doe"
          value={business?.user.last_name}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              user: { ...prev.user, last_name: value as string },
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Email Address"
          type="email"
          placeholder="example@gmail.com"
          value={business?.user.user_email}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              user: { ...prev.user, user_email: value as string },
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Password"
          type="password"
          value={business?.user.user_password}
          placeholder="Enter your password"
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              user: { ...prev.user, user_password: value as string },
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Confirm password"
          type="password"
          value={business.user.confirm_password}
          placeholder="Re-enter your password"
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              user: { ...prev.user, confirm_password: value as string },
            }));
          }}
        />
      </div>
    </div>
  );
}

export default StepOne;
