interface ActionButtonProps {
  onClick?: () => void;
  loading: boolean;
  text: string;
  loadingText?: string;
  disabled?: boolean;
  startIcon?: React.ReactNode; // For the icon before the text (optional)
}
