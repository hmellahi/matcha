import chatService from '@/services/chatService';
import { defineStore } from 'pinia';
import { useUserStore } from '@/store/user';
import { now } from '@vueuse/core';

const getConversationUserID = conversation => conversation.user.id;

export const useChatStore = defineStore('chat', {
	state: () => ({
		showUserProfile: false,
		conversations: [],
		currentConversation: null as null | {},
		msg: '',
	}),
	actions: {
		async fetchConversations() {
			this.conversations = await chatService.fetchConversations();
			const {
				user: { id: userID },
			} = this.conversations[0];
			this.showConversationMessages(userID);
		},
		async showConversationMessages(userID) {
			const conversation: Object | undefined = this.conversations.find(
				conversation => getConversationUserID(conversation) === userID
			);
			if (!conversation) {
				return;
			}
			const messages = await chatService.fetchConversationMessages(
				userID
			);
			this.currentConversation = {
				...messages,
				...conversation,
			};
		},
		sendMessage() {
			const { currentUser } = useUserStore();
			if (!this.currentConversation || !currentUser) {
				return;
			}

			const { id } = currentUser;

			const newMessage = {
				message: this.msg,
				sender_id: id,
				receiver_id: 3, // TODO : change
				created_at: now(),
			};
			this.currentConversation.messages.push(newMessage);
			this.msg = '';
		},
	},
});