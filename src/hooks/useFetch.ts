import { useApiService } from "@/contexts/ApiServiceContext";
import { useEffect, useState } from "react";

export function useFetch<T>(endpoint: string, initialValue: T) {
  const api = useApiService(); // make sure this is memoized/stable
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<T>(endpoint);
      if (res.data !== null) {
        setData(res.data);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<T>(endpoint);
        if (isMounted && res.data !== null) {
          setData(res.data);
        }
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [endpoint]); // ONLY rerun if the endpoint changes

  return { data, loading, error, refetch: fetchData };
}
