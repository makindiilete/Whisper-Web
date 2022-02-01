import { create } from "apisauce";

const apiClient = create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = localStorage.getItem("access-token");
  if (!authToken) {
  } else {
    request.headers["Authorization"] = `Bearer ${authToken}`;
  }
});

export default apiClient;
