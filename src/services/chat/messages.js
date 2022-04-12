import chatClient from "../httpChatApiService";

export const sendAMessageService = (data) =>
  chatClient.post(`/chat/sendMessage`, data);
export const getConversationMessagesService = (conversationId) =>
  chatClient.get(`/chat/getConversationMessages/${conversationId}`);
export const updateMessageStatusService = (data) =>
  chatClient.post(`/chat/updateMessageStatus`, data);
export const clearUnreadMessagesService = (data) =>
  chatClient.post(`/chat/clearUnreadMessage`, data);
