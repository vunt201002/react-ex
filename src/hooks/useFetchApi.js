import { useEffect, useState } from "react";
import { baseUrl } from "../api/apiUrl";

function useFetchApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const url = `${baseUrl}/products`;

  async function fetchData() {
    try {
      setLoading(true);

      const res = await fetch(url);
      const d = await res.json();

      setData(d.data);
      setLoading(false);
      setFetched(true);
    } catch (err) {
      console.log("Error when fetching data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    setData,
    loading,
    fetched
  };
}

export default useFetchApi;
