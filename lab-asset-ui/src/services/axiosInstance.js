import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token automatically
axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});


axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // Only handle 401 if token exists
    if (err.response?.status === 401 && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      // Optionally update state in App.js via callback instead of reload
    }
    return Promise.reject(err); // still let catch handle error
  }
);

export default axiosInstance;
