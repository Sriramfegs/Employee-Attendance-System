import { useEffect, useState } from "react";

const useFetch = (asyncFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await asyncFunction();
      setData(res.data);
      setLoading(false);
    };
    load();
  }, []);

  return { data, loading };
};

export default useFetch;
