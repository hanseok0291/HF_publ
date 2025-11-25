export type ContactDetailResponseType = {
  jobInqId: string;
  title: string;
  contents: string;
  insertionDate: string;
  inquiryWriterName: string;
  jobInqIsttName: string;
  jobInqWriterTeleNum: string;
  jobInqWriterCellNum: string;
  jobInqWriterEmail: string;
  thisLoginAdminWriteYn: boolean;
  jobInqAnsrCnt: number;
  jobInquiryAnswers: {
    jobInqAnsrId: string;
    contents: string;
    insertionDate: string;
    jobInqIsttName: string;
    inquiryWriterName: string;
    jobInqWriterEmail: string;
    thisLoginAdminWriteYn: boolean;
    deletedYn: boolean;
  }[];
};
