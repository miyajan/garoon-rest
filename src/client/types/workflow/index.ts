export type Status =
  | "UNPROCESSING"
  | "IN_PROGRESS"
  | "REJECTED"
  | "WITHDRAWN"
  | "SENT_BACK"
  | "CANCELLED"
  | "APPROVED"
  | "COMPLETED";
export type Operation =
  | "SENT_BACK"
  | "APPROVE"
  | "REJECT"
  | "WITHDRAW"
  | "CANCEL"
  | "CONFIRM"
  | "ACKNOWLEDGE";
export type Item =
  | SingleLineTextItem
  | MultiLineTextItem
  | NumberItem
  | CalcItem
  | CheckBoxItem
  | RadioButtonItem
  | DropDownItem
  | FileItem
  | DateItem
  | DateTimeItem
  | RouteNaviItem;
export type SingleLineTextItem = {
  name: string;
  type: "SINGLE_LINE_TEXT";
  value: string;
};
export type MultiLineTextItem = {
  name: string;
  type: "MULTI_LINE_TEXT";
  value: string;
};
export type NumberItem = {
  name: string;
  type: "NUMBER";
  value: string;
};
export type CalcItem = {
  name: string;
  type: "CALC";
  value: string;
};
export type CheckBoxItem = {
  name: string;
  type: "CHECK_BOX";
  value: boolean;
};
export type RadioButtonItem = {
  name: string;
  type: "RADIO_BUTTON";
  value: string;
};
export type DropDownItem = {
  name: string;
  type: "DROP_DOWN";
  value: string;
};
export type FileItem = {
  name: string;
  type: "FILE";
  value: Array<{
    id: string;
    contentType: string;
    name: string;
    size: string;
  }>;
};
export type DateItem = {
  name: string;
  type: "DATE";
  value: string;
};
export type DateTimeItem = {
  name: string;
  type: "DATETIME";
  value: {
    date: string;
    time: string;
  };
};
export type RouteNaviItem = {
  name: string;
  type: "ROUTE_NAVI";
  value: {
    route: string;
    expense: string;
  };
};
