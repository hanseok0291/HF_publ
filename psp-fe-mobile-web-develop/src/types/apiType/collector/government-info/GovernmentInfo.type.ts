export type GetLocalGovermentType = {
  localGovernmentId: string;
  localGovernmentName: string;
  sdNm: string;
  sggNm: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  businessRegisterationNumber: string;
  representativeName: string;
  representationNumber: string;
  imageFileList: string[];
  keyManList: {
    keyManId: string;
    managementOrder: number;
    name: string;
    email: string;
    telePhoneNumber: string;
    cellPhoneNumber: string;
    createdDate: string;
  }[];
};
