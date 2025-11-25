import { GetLocalGovermentType } from "@/types/apiType/collector/government-info/GovernmentInfo.type";
import { ApiFunction } from "@/types/HttpClient.type";
import { getRequest } from "@/lib/httpClients";

export const getLocalGoverment: ApiFunction<void, GetLocalGovermentType> = () =>
  getRequest({ url: `/v1/institution/local-government` });
