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
