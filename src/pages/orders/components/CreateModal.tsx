import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import Dispa8chModal from "@/lib/modal/Dispa8chModal";
import React, { useState } from "react";
import styles from "@/pages/orders/components/style/Index.module.css";
import Dispa8chDateInput from "@/lib/inputs/Dispa8chDateInput";
import Dispa8chButton from "@/lib/buttons/Dispa8chButton";
import Util from "@/utils/Util";
import { useApiService } from "@/contexts/ApiServiceContext";
import { apiRoutes } from "@/lib/apiRoutes";
import { useToast } from "@/contexts/ToastContext";
import Dispa8chDropDown from "@/lib/inputs/Dispa8chDropDown";
import { useModal } from "@/hooks/useModal";
import { useOrder } from "@/hooks/useOrder";

function CreateModal({ refetch }: { refetch: () => void }) {
  const { order: prevOrder, setOrder: setPrevOrder } = useOrder();
  const { setOpen, setKey, key } = useModal();
  const api = useApiService();
  const { showToast } = useToast();
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
    payment_type: "card",
    order_status: "pending",
    rider_id: null,
    company_id: company.id,
    items: [],
  });

  const [item, setItem] = useState<OrderItem>({
    item_name: "",
    item_price: "",
    item_quantity: "",
    id: null,
  });

  const [items, setItems] = useState<OrderItem[]>([]);

  function removeItemById(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function submitData() {
    try {
      const payload = {
        pickup_username: order?.pickup_username || "",
        pickup_phone: order?.pickup_phone || "",
        pickup_address: order?.pickup_address || "",
        pickup_time: Util.extractDateTime(order?.pickup_time).time || "",
        delivery_receiver_name: order?.delivery_receiver_name || "",
        delivery_email: order?.delivery_email || "",
        delivery_phone: order?.delivery_phone || "",
        delivery_address: order?.delivery_address || "",
        delivery_time: Util.extractDateTime(order?.delivery_date).time || "",
        delivery_date: Util.extractDateTime(order?.delivery_date).date || "",
        tax_rate: +(order?.tax_rate ?? 0),
        delivery_fees: +(order?.delivery_fees ?? 0),
        discount: +(order?.discount ?? 0),
        delivery_instruction: order?.delivery_instruction || "",
        payment_type: order?.payment_type,
        order_status: "pending",
        rider_id: null,
        company_id: company.company_id,
        items,
      };

      setSending(true);
      api
        .post<CreateOrderResponse>(apiRoutes.order.create, payload)
        .then((res) => {
          if (res.status === "success") {
            showToast(res.message, "success");
            refetch();
            setOpen(false);
            setKey(null);
            setPrevOrder(null);
            setOrder({
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
              payment_type: "card",
              order_status: "pending",
              rider_id: null,
              company_id: company.id,
              items: [],
            });
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.error("Request was aborted due to timeout.");
            showToast("Request was aborted due to timeout.", "error");
          } else {
            showToast("Unexpected error occured.", "error");
            console.error("API Error:", err);
          }
        })
        .finally(() => setSending(false));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dispa8chModal
      onClose={() => {
        setOpen(false);
        setKey(null);
        setPrevOrder(null);
      }}
      title={prevOrder ? "Edit Order" : "New Order"}
      visible={key === "create-order"}
      size="large"
      actionButtonPayload={{
        action: () => {
          submitData();
        },
        label: "Save",
        disabled:
          !prevOrder ||
          (!Util.isAllValid([
            order?.pickup_username,
            order?.pickup_phone,
            order?.pickup_address,
            order?.pickup_time,
            order?.delivery_receiver_name,
            order?.delivery_email,
            order?.delivery_phone,
            order?.delivery_address,
            order?.delivery_date,
            String(order?.delivery_fees),
            order?.delivery_instruction,
            order?.payment_type,
          ]) &&
            items.length === 0),
        loading: sending,
      }}
    >
      <section className={styles.grid}>
        <div className={styles.line}>
          <section className={styles.section}>
            <h5>Pick-up Form</h5>
            <div className={styles.div}>
              <Dispa8chInput
                label="Name"
                value={prevOrder?.pickup_username || order.pickup_username}
                placeholder="Enter customer name"
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    pickup_username: value as string,
                  }));
                }}
                type="text"
                required
              />
              <Dispa8chInput
                label="Phone number"
                value={prevOrder?.pickup_phone || order.pickup_phone}
                placeholder="123 456 7890"
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    pickup_phone: value as string,
                  }));
                }}
                type="phone"
                required
              />
              <Dispa8chInput
                label="Address"
                value={prevOrder?.pickup_address || order.pickup_address}
                placeholder="Enter a location"
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    pickup_address: value as string,
                  }));
                }}
                type="text"
                required
              />
              <Dispa8chDateInput
                label="Pick-up Date & Time"
                value={prevOrder?.pickup_time || order.pickup_time}
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    pickup_time: value as string,
                  }));
                }}
              />
            </div>
          </section>
          <section className={styles.section}>
            <h5>Deliver To</h5>
            <div className={styles.div}>
              <Dispa8chInput
                label="Receiver"
                value={
                  prevOrder?.delivery_receiver_name ||
                  order.delivery_receiver_name
                }
                placeholder="Enter name"
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
                value={prevOrder?.delivery_phone || order.delivery_phone}
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
                label="Receiver Email"
                value={prevOrder?.delivery_email || order.delivery_email}
                placeholder="Enter receiver email"
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    delivery_email: value as string,
                  }));
                }}
                type="text"
                required
              />
              <Dispa8chInput
                label="Delivery address"
                value={prevOrder?.delivery_address || order.delivery_address}
                placeholder="Enter destination location"
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    delivery_address: value as string,
                  }));
                }}
                type="text"
                required
              />
              <Dispa8chDateInput
                label="Delivery Date & Time"
                value={prevOrder?.delivery_date || order.delivery_date}
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    delivery_date: value as string,
                  }));
                }}
              />
            </div>
          </section>
        </div>
        <div>
          <section className={styles.section}>
            <div className={styles.div}>
              <Dispa8chInput
                label="Tax Rate % (Optional)"
                placeholder="Enter tax rate"
                value={prevOrder?.tax_rate || String(order.tax_rate)}
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    tax_rate: value as number,
                  }));
                }}
                type="number"
                // required
              />
              <Dispa8chInput
                label="Delivery fees"
                placeholder="Enter delivery fee"
                value={prevOrder?.delivery_fees || String(order.delivery_fees)}
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    delivery_fees: value as number,
                  }));
                }}
                type="currency"
                required
              />
              <Dispa8chInput
                label="Discount (Optional)"
                value={prevOrder?.discount || String(order.discount)}
                placeholder="Enter a location"
                onChange={(value) => {
                  setOrder((prev) => ({
                    ...prev,
                    discount: value as number,
                  }));
                }}
                type="currency"
                // required
              />
              <Dispa8chDropDown
                label="Payment type"
                required
                value={prevOrder?.payment_type || order.payment_type}
                type="large"
                options={[
                  {
                    label: "Card",
                    value: "card",
                  },
                  {
                    label: "Cash",
                    value: "cash",
                  },
                  // {
                  //   label: "Wallet",
                  //   value: "wallet",
                  // },
                  {
                    label: "Transfer",
                    value: "bank_transfer",
                  },
                ]}
                onChange={(value) =>
                  setOrder((prev) => ({ ...prev, payment_type: value.value }))
                }
              />
              <Dispa8chInput
                label=""
                value={
                  prevOrder?.delivery_instruction || order.delivery_instruction
                }
                placeholder="Delivery instruction"
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
          </section>
          <section className={styles.section}>
            <h5>Order Items</h5>
            <div className={styles.extended}>
              <Dispa8chInput
                label=""
                placeholder="Item name"
                value={item.item_name}
                onChange={(value) => {
                  setItem((prev) => ({ ...prev, item_name: value as string }));
                }}
                type="text"
                // required
              />
              <Dispa8chInput
                label=""
                placeholder="Price"
                value={Util.formatCurrencyInput(item.item_price)}
                onChange={(value) => {
                  setItem((prev) => ({ ...prev, item_price: value as string }));
                }}
                type="currency"
                // required
              />
              <Dispa8chInput
                label=""
                placeholder="Qty"
                value={item.item_quantity}
                onChange={(value) => {
                  setItem((prev) => ({
                    ...prev,
                    item_quantity: value as string,
                  }));
                }}
                type="number"
                // required
              />
            </div>
            <div style={{ margin: "0.5rem 0" }}>
              <Dispa8chButton
                label="Add"
                type="primary"
                size="small"
                buttonStyle={{ padding: "0.2rem 1rem" }}
                disabled={
                  !Util.isAllValid(Object.values(item)) ||
                  item.item_name.length < 3
                }
                onClick={() => {
                  if (Object.values(item).every((i) => i !== "")) {
                    setItems((prev) => [
                      ...prev,
                      { ...item, id: crypto.randomUUID() },
                    ]);
                    setItem({
                      item_name: "",
                      item_price: "",
                      item_quantity: "",
                      id: null,
                    });
                  }
                }}
              />
            </div>
            <ul className={styles.items}>
              {items.map((obj, i) => (
                <li key={i}>
                  <div className={styles.left}>
                    <p>{obj.item_name}</p>
                    <div>
                      <span>{Util.formatCurrency(+obj.item_price)}/item</span>
                      <small>Qty: {obj.item_quantity}</small>
                    </div>
                  </div>
                  <Dispa8chButton
                    label="Remove"
                    type="text"
                    size="small"
                    buttonStyle={{ padding: "0.2rem 1rem" }}
                    onClick={() => removeItemById(obj.id as string)}
                  />
                </li>
              ))}
              <div className={styles.total}>
                <p>Total:</p>
                <b>
                  {Util.formatCurrency(
                    items.reduce(
                      (acc, curr) =>
                        acc + +curr.item_price * +curr.item_quantity,
                      0
                    ),
                    "ngn"
                  )}
                </b>
              </div>
            </ul>
          </section>
        </div>
      </section>
    </Dispa8chModal>
  );
}

export default CreateModal;
