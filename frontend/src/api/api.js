
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
;

export const apiRequest = async (endpoint, method = "GET", body) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
      },
      body: body ? JSON.stringify(body) : null
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  } catch (err) {
    return { error: err.message };
  }
};
