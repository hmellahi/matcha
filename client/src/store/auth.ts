import { defineStore } from 'pinia';
import {
	changePassword,
	login,
	logout,
	registerUser,
	requestPasswordReset,
} from '../services/authService';
import { useUserStore } from './user';

export const useAuthStore = () => {
	const router = useRouter();
	return defineStore('auth', {
		state: () => ({}),
		actions: {
			async logIn(username: string, password: string) {
				await login(username, password);
				const { getCurrentUser } = useUserStore();

				await getCurrentUser();
				router.push({ path: '/' });
			},
			async register(newUser) {
				await registerUser(newUser);
				router.push({ path: '/ConfirmationEmailSent' });
			},
			async logout() {
				await logout();
				router.push({ path: '/login' });
			},
			async requestPasswordReset(email: string) {
				await requestPasswordReset(email);
				router.push({ path: '/ResetEmailSent' });
			},
			async changePassword(newPassword, token) {
				try {
					await changePassword({ password: newPassword, token });
				} catch (e) {}
				router.push({ path: '/ResetPassword/success' });
			},
		},
	})();
};
