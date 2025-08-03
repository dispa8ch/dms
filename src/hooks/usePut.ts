import { useApiService } from "@/contexts/ApiServiceContext";
import { useState } from "react";

export function usePut<T>(initialValue: T | null = null) {
  const api = useApiService();
  const [response, setResponse] = useState<BaseResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const put = async <Payload = any>(endpoint: string, payload: Payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<T>(endpoint, payload);
      setResponse(res);
      return res;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, put };
}
