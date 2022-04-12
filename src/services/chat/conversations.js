import chatClient from "../httpChatApiService";

export const getAllConversationsService = (userId) =>
  chatClient.get(`/chat/getUserConversations/${userId}`);
export const getAConversationService = (conversationId) =>
  chatClient.get(`/chat/getAConversation/${conversationId}`);
export const getConversationService = (data) =>
  chatClient.post(`/chat/getConversation`, data);
