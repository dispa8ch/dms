import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import Dispa8chModal from "@/lib/modal/Dispa8chModal";
import React, { useState } from "react";
import styles from "@/pages/orders/components/style/Index.module.css";
import Dispa8chDateInput from "@/lib/inputs/Dispa8chDateInput";
import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import Util from "@/utils/Util";
import { useApiService } from "@/contexts/ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";
import Dispa8chSelect from "@/lib/inputs/Dispa8chSelect";

function CreateModal({
  open,
  setOpen,
  refetch,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) {
  const api = useApiService();
  const [sending, setSending] = useState(false);
  const company = JSON.parse(localStorage.getItem("companyData") ?? "{}");
  const [order, setOrder] = useState<CreateOrder>({
    pickup_username: "",
    pickup_phone: "",
    pickup_address: "",
    pickup_time: "",
    delivery_receiver_name: "",
    delivery_email: "",
    delivery_phone: "",
    delivery_address: "",
    delivery_time: "",
    delivery_date: "",
    tax_rate: 0,
    delivery_fees: 0,
    discount: 0,
    delivery_instruction: "",
    payment_type: "",
    order_status: "pending",
    rider_id: null,
    company_id: company.id,
    items: [],
  });

  // const [item, setItem] = useState<OrderItem>({
  //   name: "",
  //   price: "",
  //   quantity: "",
  //   id: null,
  // });

  const [items, setItems] = useState<OrderItem[]>([]);

  function removeItemById(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function submitData() {
    setSending(true);
    api
      .post<CreateOrderResponse>(apiRoutes.order.create, {
        pickup_username: order?.pickup_username || "",
        pickup_phone: order?.pickup_phone || "",
        pickup_address: order?.pickup_address || "",
        pickup_time: order?.pickup_time || "",
        delivery_receiver_name: order?.delivery_receiver_name || "",
        delivery_email: order?.delivery_email || "",
        delivery_phone: order?.delivery_phone || "",
        delivery_address: order?.delivery_address || "",
        delivery_time: order?.delivery_time || "",
        delivery_date: order?.delivery_date || "",
        tax_rate: +(order?.tax_rate ?? 0),
        delivery_fees: +(order?.delivery_fees ?? 0),
        discount: +(order?.discount ?? 0),
        delivery_instruction: order?.delivery_instruction || "",
        payment_type: order?.payment_type,
        order_status: "pending",
        rider_id: null,
        company_id: company.id,
        items,
      })
      .then((res) => {
        console.log();
      })
      .catch((err) => console.log(err))
      .finally(() => setSending(false));
  }

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
          console.log(order);
        },
        label: "Save",
        disabled:
          !Util.isAllValid([
            order?.pickup_username,
            order?.pickup_phone,
            order?.pickup_address,
            order?.pickup_time,
            order?.delivery_receiver_name,
            order?.delivery_email,
            order?.delivery_phone,
            order?.delivery_address,
            order?.delivery_time,
            order?.delivery_date,
            String(order?.delivery_fees),
            order?.delivery_instruction,
            order?.payment_type,
          ]) || items.length < 1,
        loading: sending,
      }}
    >
      <div className={styles.grid}>
        <Dispa8chInput
          label="Name"
          placeholder="Enter rider name"
          onChange={(value) => {
            setOrder((prev) => ({
              ...prev,
              delivery_receiver_name: value as string,
            }));
          }}
          type="text"
          required
        />
        <Dispa8chInput
          label="Phone number"
          placeholder="123 456 7890"
          onChange={(value) => {
            setOrder((prev) => ({
              ...prev,
              delivery_phone: value as string,
            }));
          }}
          type="phone"
          required
        />
        <Dispa8chInput
          label="Email"
          placeholder="Enter email address"
          onChange={(value) => {
            setOrder((prev) => ({
              ...prev,
              delivery_email: value as string,
            }));
          }}
          type="text"
          required
        />
        <Dispa8chSelect
          label="Means of Identification"
          required
          options={[
            {
              label: "NIN",
              value: "nin",
            },
            {
              label: "International Passport",
              value: "international-passport",
            },
            {
              label: "Permanent Voter's Card",
              value: "parmanent-voter's-card",
            },
          ]}
        />
        <Dispa8chDateInput
          label="Date Of Birth"
          value={order.delivery_date}
          withTime={false}
          onChange={(value) => {
            setOrder((prev) => ({
              ...prev,
              delivery_date: value as string,
            }));
          }}
        />
        <Dispa8chSelect
          label="Gender"
          required
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
        />
        <Dispa8chInput
          label="Residential Address"
          placeholder="Enter rider's residential address"
          onChange={(value) => {
            setOrder((prev) => ({
              ...prev,
              delivery_address: value as string,
            }));
          }}
          type="text"
          required
        />

        <Dispa8chSelect
          label="Vehicle"
          required
          options={[
            {
              label: "Motorbike",
              value: "motorbike",
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
        />
      </div>
      <div style={{ margin: "1rem 0" }}>
        <Dispa8chInput
          label=""
          placeholder="Note"
          onChange={(value) => {
            setOrder((prev) => ({
              ...prev,
              delivery_instruction: value as string,
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
