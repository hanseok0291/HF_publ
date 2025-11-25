import { useState } from "react";
import { temporaryPasswordLogin } from "@/apis/common/authApis";

export const useTempPassword = (adminId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [temp, setTemp] = useState<boolean | undefined>();

  const refreshTempPassword = async () => {
    if (!adminId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await temporaryPasswordLogin({ adminId });
      setTemp(response.content);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    temp,
    isLoading,
    error,
    refreshTempPassword
  };
};
