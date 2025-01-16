interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}