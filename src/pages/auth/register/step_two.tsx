import React from "react";
import styles from "@/pages/auth/style/Index.module.css";
import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import { useRegister } from "@/contexts/RegisterContext";

function StepTwo() {
  const business = useRegister();
  return (
    <div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Business name"
          type="text"
          placeholder="Goodwill Logistics"
          value={business?.companyName}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              companyName: value as string,
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="City"
          type="text"
          placeholder="Abc County"
          value={business?.city}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              city: value as string,
            }));
          }}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Phone number"
          type="phone"
          // placeholder="example@gmail.com"
          value={business?.phone}
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              phone: value as string,
            }));
          }}
        />
      </div>
      {/* <div className={styles.input_wrapper}>
        <Dispa8chInput
          label="Password"
          type="password"
          value={business?.user.user_password}
          placeholder="enter your password"
          onChange={(value) => {
            business?.setRegisterPayload((prev) => ({
              ...prev,
              user: { ...prev.user, user_password: value as string },
            }));
          }}
        />
      </div> */}
    </div>
  );
}

export default StepTwo;
