import { create } from "apisauce";

const apiClient = create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.addAsyncRequestTransform(async (request) => {
  console.log("Current base URL = ", process.env.REACT_APP_API_URL);
  console.log("Current env = ", process.env.REACT_APP_ENV);
  const authToken = localStorage.getItem("access-token");
  if (!authToken) {
  } else {
    request.headers["Authorization"] = `Bearer ${authToken}`;
  }
});

export default apiClient;
