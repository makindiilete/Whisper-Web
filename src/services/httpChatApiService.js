import { create } from "apisauce";

const chatClient = create({
    baseURL: process.env.REACT_APP_CHAT_URL,
});

chatClient.addAsyncRequestTransform(async (request) => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
    } else {
        request.headers["Authorization"] = `Bearer ${authToken}`;
    }
});

export default chatClient;
