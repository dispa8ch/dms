import { useApiService } from "@/contexts/ApiServiceContext";
import { useToast } from "@/contexts/ToastContext";
import { useModal } from "@/hooks/useModal";
import Util from "@/utils/Util";
import React from "react";
import styles from "@/pages/orders/components/style/Index.module.css";
import Dispa8chModal from "@/lib/modal/Dispa8chModal";

function AssignModal({
  refetch,
  orderId,
  orderNumber,
}: {
  refetch: () => void;
  orderId: string;
  orderNumber: string;
}) {
  const { open, setOpen, key, setKey } = useModal();
  const api = useApiService();
  const { showToast } = useToast();
  const [sending, setSending] = React.useState(false);
  const company = JSON.parse(localStorage.getItem("companyData") ?? "{}");
  return (
    <Dispa8chModal
      onClose={() => {
        setOpen(false);
        setKey(null);
      }}
      title="Assign Order"
      visible={key === "assign-rider"}
      size="large"
    >
      <section className={styles.assign_modal}>
        <div className={styles.id}>
          <span>ORDER NUMBER</span> {orderNumber.toUpperCase()}
        </div>
        <div className={styles.alert}>
          <small>
            <b>Notice:</b> Double check to ensure that you’re assigning this
            order to the right driver!
          </small>
        </div>
        <div></div>
      </section>
    </Dispa8chModal>
  );
}

export default AssignModal;
