const headersApi = {
  "Content-Type": "application/json",
};

export const fetchApi = async ({ url, method, body = null }) => {
  const response = await fetch(
    url,
    {
      method: method,
      headers: headersApi,
      body: body && JSON.stringify({ data: body })
    }
  );

  const res = await response.json();

  return res;
};