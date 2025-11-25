import { ApiResponseType } from "@/types/store/waste-sticker/AccordionMenu.type";

export const mockApiResponse: ApiResponseType = {
  parentItems: [
    { id: 1, text: "세부품목명 세부품목명1", amount: "0,000" },
    { id: 2, text: "세부품목명 세부품목명2", amount: "0,000" }
  ],
  childItems: [
    {
      parentId: 1,
      items: [
        { id: 1, text: "규격명 규격명1", amount: "0,000" },
        { id: 2, text: "규격명 규격명2", amount: "0,000" }
      ]
    },
    {
      parentId: 2,
      items: [
        { id: 1, text: "규격명 규격명3", amount: "0,000" },
        { id: 2, text: "규격명 규격명4", amount: "0,000" }
      ]
    }
  ]
};
