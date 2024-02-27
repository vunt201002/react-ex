import { useEffect, useState } from "react";

function useFetchApi(url) {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch(url);
      const d = await res.json();
      setData(d); // Set the fetched data
    } catch (err) {
      console.log("Error when fetching data");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
  };
}

export default useFetchApi;
