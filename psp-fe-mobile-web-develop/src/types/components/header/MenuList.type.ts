export type MenuText = {
  id: number;
  text: string;
};

export type Link = {
  id: number;
  text: string;
};

export type MenuListType = {
  menuText: Array<{ id: number; text: string }>;
  link: Array<{ id: number; text: string }>;
};
