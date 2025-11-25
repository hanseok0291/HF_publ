export type ResultDetailAddressType = {
  bdName: string;
  jibunAddress: string;
  setBdName: (value: string) => void;
  setJibunAddress: (value: string) => void;
  reset: () => void;
};

export type ResultAddressType = {
  resultAddress: string;
  setResultAddress: (value: string) => void;
  reset: () => void;
};
