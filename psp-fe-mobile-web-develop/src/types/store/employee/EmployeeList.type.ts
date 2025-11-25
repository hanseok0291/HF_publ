export type EmployeeListType = {
  title?: string;
  subTitle?: string;
  listNum?: string;
  content?: Array<{ id: number; title: string; content: string }>;
  showButton?: boolean;
  onConfirm?: Function;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
