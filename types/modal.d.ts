interface ModalContainer {
  children: ReactNode;
  title: string;
  action: () => void;
  actionText?: string;
  onCancel: () => void;
  canceltext?: string;
  visible: boolean;
  actionDiabled?: boolean;
  actionLoading?: boolean;
}

interface Dispa8chModal {
  title: string;
  onClose: () => void;
  visible: boolean;
  children: React.ReactNode;
  replaceBottom?: React.ReactNode;
  size?: "large" | "medium" | "small";
  actionButtonPayload?: {
    icon?: React.ReactNode;
    label: string;
    action: () => void;
    disabled?: boolean;
    loading?: boolean;
  };
}

interface Modal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
