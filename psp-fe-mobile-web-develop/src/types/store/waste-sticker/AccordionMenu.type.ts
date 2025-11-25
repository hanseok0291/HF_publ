export type BaseItemType = {
  id: number;
  text: string;
  amount: string;
};

export type ApiResponseType = {
  parentItems: BaseItemType[];
  childItems: {
    parentId: number;
    items: BaseItemType[];
  }[];
};

export type CheckedStateType = {
  [key: string]: boolean;
};
