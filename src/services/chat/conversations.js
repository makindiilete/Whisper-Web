import chatClient from "../httpChatApiService";
import apiClient from "../httpApiSauceService";

export const getAllConversationsService = (userId) =>
  chatClient.get(`/chat/getUserConversations/${userId}`);
export const getAConversationService = (conversationId) =>
  chatClient.get(`/chat/getConversationMessages/${conversationId}`);
export const createAConversationService = (data) =>
  chatClient.post(`/chat/getConversation`, data);
export const getAllMatchesService = (userId) =>
  apiClient.get(`/app/getFriends/${userId}`);
export const acceptFriendRequest = (data) =>
  apiClient.get(`/app/acceptFriendRequest`);
export const resolveCodeService = (data) => apiClient.get(`/app/resolveCode`);
