import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import Dispa8chModal from "@/lib/modal/Dispa8chModal";
import React, { useState } from "react";
import styles from "@/pages/orders/components/style/Index.module.css";
import Dispa8chDateInput from "@/lib/inputs/Dispa8chDateInput";
import Util from "@/utils/Util";
import { useApiService } from "@/contexts/ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";
import Dispa8chSelect from "@/lib/inputs/Dispa8chSelect";
import { useToast } from "@/contexts/ToastContext";
import { useModal } from "@/hooks/useModal";

function CreateModal({ refetch }: { refetch: () => void }) {
  const api = useApiService();
  const { showToast } = useToast();
  const { open, setOpen } = useModal();
  const [sending, setSending] = useState(false);
  const company = JSON.parse(localStorage.getItem("companyData") ?? "{}");
  const [rider, setRider] = useState<CreateRider>({
    rider_email: "",
    rider_phone: "",
    rider_password:
      "Te" +
      Util.generateTempPassword({
        length: 16,
        includeSymbols: false,
      }) +
      "mp",
    rider_first_name: "",
    rider_last_name: "",
    rider_other_names: "",
    rider_profile_pic: "",
    rider_preference: {
      theme: "light",
      notification_alert_mode: "email",
      enable_push_notification: true,
      enable_order_status_update: true,
      enable_order_reminder: true,
      currency: "ngn",
      language: "en",
    },
    rider_gender: "male",
    rider_dob: "",
    rider_means_of_id: "nin",
    rider_address: "",
    rider_vehicle: "",
    rider_vehicle_plate: "",
    rider_note: "",
    rider_availability: true,
    company_id: company.company_id,
  });

  function submitData() {
    setSending(true);
    api
      .post<CreateRiderResponse>(apiRoutes.rider.create, rider)
      .then((res) => {
        showToast(res.message, "success");
        refetch();
        setOpen(false);
        setRider({
          rider_email: "",
          rider_phone: "",
          rider_password: Util.generateTempPassword({
            length: 16,
            includeSymbols: false,
          }),
          rider_first_name: "",
          rider_last_name: "",
          rider_other_names: "",
          rider_profile_pic: "",
          rider_preference: {
            theme: "light",
            notification_alert_mode: "email",
            enable_push_notification: true,
            enable_order_status_update: true,
            enable_order_reminder: true,
            currency: "ngn",
            language: "en",
          },
          rider_gender: "male",
          rider_dob: "",
          rider_means_of_id: "nin",
          rider_address: "",
          rider_vehicle: "",
          rider_vehicle_plate: "",
          rider_note: "",
          rider_availability: true,
          company_id: company.company_id,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.error("Request was aborted due to timeout.");
          showToast("Request was aborted due to timeout.", "error");
        }
      })
      .finally(() => setSending(false));
  }

  // // Default 12 chars, includes symbols, avoids ambiguous chars
  // const pwd1 = Util.generateTempPassword();

  // // 16 chars, no symbols
  // const pwd2 = Util.generateTempPassword({ length: 16, includeSymbols: false });

  // // 20 chars, include symbols and allow ambiguous chars
  // const pwd3 = Util.generateTempPassword({
  //   length: 20,
  //   includeSymbols: true,
  //   avoidAmbiguous: false,
  // });

  // console.log("One: ", pwd1);
  // console.log("Two: ", pwd2);
  // console.log("Three: ", pwd3);

  return (
    <Dispa8chModal
      onClose={() => {
        setOpen(false);
      }}
      title="Add a New Rider"
      visible={open}
      size="medium"
      actionButtonPayload={{
        action: () => {
          submitData();
        },
        label: "Save",
        disabled: !Util.isAllValid([
          rider.rider_email,
          rider.rider_phone,
          rider.rider_password,
          rider.rider_first_name,
          rider.rider_last_name,
          rider.rider_means_of_id,
          rider.rider_dob,
          rider.rider_gender,
          rider.rider_vehicle,
          rider.rider_vehicle_plate,
          rider.rider_address,
          // rider.rider_vehicle,
        ]),
        loading: sending,
      }}
    >
      <div className={styles.grid}>
        <Dispa8chInput
          label="First Name"
          placeholder="Enter rider first name"
          value={rider.rider_first_name}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_first_name: value as string,
            }));
          }}
          type="text"
          required
        />
        <Dispa8chInput
          label="Last Name"
          placeholder="Enter rider last name"
          value={rider.rider_last_name}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_last_name: value as string,
            }));
          }}
          type="text"
          required
        />
        <Dispa8chInput
          label="Other Names"
          placeholder="Enter rider other name"
          value={rider.rider_other_names}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_other_names: value as string,
            }));
          }}
          type="text"
        />
        <Dispa8chInput
          label="Phone number"
          placeholder="123 456 7890"
          value={rider.rider_phone}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_phone: value as string,
            }));
          }}
          type="phone"
          required
        />
        <Dispa8chInput
          label="Email"
          placeholder="Enter email address"
          value={rider.rider_email}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_email: value as string,
            }));
          }}
          type="text"
          required
        />
        <Dispa8chSelect
          label="Means of Identification"
          required
          defaultValue={rider.rider_means_of_id}
          placeholder="Select means of identification"
          options={[
            {
              label: "NIN",
              value: "nin",
            },
            {
              label: "Driver's License",
              value: "driver_license",
            },
            {
              label: "International Passport",
              value: "passport",
            },
            {
              label: "Voter's Card",
              value: "voter_card",
            },
          ]}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_means_of_id: value.value as
                | "nin"
                | "driver_license"
                | "passport"
                | "voter_card",
            }));
          }}
        />
        <Dispa8chDateInput
          label="Date Of Birth"
          value={rider.rider_dob}
          withTime={false}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_dob: value as string,
            }));
          }}
        />
        <Dispa8chSelect
          label="Gender"
          required
          placeholder="Select gender"
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
          onChange={(value) =>
            setRider((prev) => ({
              ...prev,
              rider_gender: value.value as "male" | "female",
            }))
          }
        />
        <Dispa8chInput
          label="Residential Address"
          placeholder="Enter rider's residential address"
          value={rider.rider_address}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_address: value as string,
            }));
          }}
          type="text"
          required
        />
        <Dispa8chSelect
          label="Vehicle"
          required
          placeholder="Select vehicle type"
          options={[
            {
              label: "Motorbike",
              value: "motorcycle",
            },
            {
              label: "Truck",
              value: "truck",
            },
            {
              label: "Lorry",
              value: "lorry",
            },
            {
              label: "Tricycle",
              value: "tricycle",
            },
          ]}
          onChange={(value) =>
            setRider((prev) => ({ ...prev, rider_vehicle: value.value }))
          }
        />
        <Dispa8chInput
          label="Vehicle Plate Number"
          placeholder="Enter rider's vehicle plate number"
          value={rider.rider_vehicle_plate}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_vehicle_plate: value as string,
            }));
          }}
          type="text"
          required
        />
        <Dispa8chInput
          label="Rider Login Password"
          placeholder="Enter rider's login password"
          value={rider.rider_password}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_password: value as string,
            }));
          }}
          type="text"
          required
          disabled
        />
      </div>
      <div style={{ margin: "1rem 0" }}>
        <Dispa8chInput
          label=""
          placeholder="Note"
          value={rider.rider_note}
          onChange={(value) => {
            setRider((prev) => ({
              ...prev,
              rider_note: value as string,
            }));
          }}
          type="textarea"
          // required
        />
      </div>
    </Dispa8chModal>
  );
}

export default CreateModal;
