import Dispa8chInput from "@/lib/inputs/Dispa8chInput";
import Dispa8chModal from "@/lib/modal/Dispa8chModal";
import React from "react";
import styles from "@/pages/orders/components/style/Index.module.css";

function CreateModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dispa8chModal
      onClose={() => {
        setOpen(false);
      }}
      title="New Order"
      visible={open}
      size="large"
      actionButtonPayload={{
        action: () => {},
        label: "Save",
        disabled: true,
      }}
    >
      <section className={styles.grid}>
        <div className={styles.line}>
          <section className={styles.section}>
            <h5>Pick-up Form</h5>
            <div className={styles.div}>
              <Dispa8chInput
                label="Name"
                placeholder="Enter customer name"
                onChange={() => {}}
                type="text"
                required
              />
              <Dispa8chInput
                label="Phone number"
                placeholder="123 456 7890"
                onChange={() => {}}
                type="phone"
                required
              />
              <Dispa8chInput
                label="Address"
                placeholder="Enter a location"
                onChange={() => {}}
                type="text"
                required
              />
              <Dispa8chInput
                label="Pick-up Time"
                placeholder="Enter customer name"
                onChange={() => {}}
                type="text"
                required
              />
            </div>
          </section>
          <section className={styles.section}>
            <h5>Deliver To</h5>
            <div className={styles.div}>
              <Dispa8chInput
                label="Name"
                placeholder="Enter customer name"
                onChange={() => {}}
                type="text"
                required
              />
              <Dispa8chInput
                label="Phone number"
                placeholder="123 456 7890"
                onChange={() => {}}
                type="phone"
                required
              />
              <Dispa8chInput
                label="Address"
                placeholder="Enter a location"
                onChange={() => {}}
                type="text"
                required
              />
              <Dispa8chInput
                label="Pick-up Time"
                placeholder="Enter customer name"
                onChange={() => {}}
                type="text"
                required
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
                onChange={() => {}}
                type="number"
                // required
              />
              <Dispa8chInput
                label="Delivery fees"
                placeholder="Enter delivery fee"
                onChange={() => {}}
                type="currency"
                required
              />
              <Dispa8chInput
                label="Discount (Optional)"
                placeholder="Enter a location"
                onChange={() => {}}
                type="currency"
                // required
              />
              <Dispa8chInput
                label=""
                placeholder="Delivery instruction"
                onChange={() => {}}
                type="textarea"
                // required
              />
            </div>
          </section>
          <section className={styles.section}>
            <h5>Order Details</h5>
            <div className={styles.extended}>
              <Dispa8chInput
                label=""
                placeholder="Name"
                onChange={() => {}}
                type="text"
                // required
              />
              <Dispa8chInput
                label=""
                placeholder="Price"
                onChange={() => {}}
                type="currency"
                // required
              />
              <Dispa8chInput
                label=""
                placeholder="Qty"
                onChange={() => {}}
                type="number"
                // required
              />
            </div>
          </section>
        </div>
      </section>
    </Dispa8chModal>
  );
}

export default CreateModal;
