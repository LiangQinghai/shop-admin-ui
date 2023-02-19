import { defineStore } from "pinia";
import { UserState } from "@/store/modules/user/types";
import { AdminUserLoginDTO } from "@/api/modules/user/types";
import { clearToken, setToken, USER_INFO } from "@/utils/auth/";
import { login, logout, userInfo } from "@/api/modules/user";
import piniaPersistConfig from "@/store/config";

const useUserStore = defineStore("user", {
	state: (): UserState => ({ id: -1, isSupper: false, status: false, username: "noLogin" }),
	getters: {
		userInfo(state: UserState): UserState {
			return { ...state };
		},
		getUserInfo(): UserState {
			return { ...this };
		}
	},
	actions: {
		// 设置用户信息
		setInfo(partial: Partial<UserState>) {
			this.$patch(partial);
		},
		// 重置
		resetInfo() {
			this.$reset();
		},
		async info() {
			const userInfoData = await userInfo();
			if (userInfoData.data) {
				this.setInfo(userInfoData.data);
			}
		},
		async login(loginForm: AdminUserLoginDTO) {
			try {
				// login api
				const res = await login(loginForm);
				setToken(res.data?.accessToken);
			} catch (err) {
				clearToken();
				throw err;
			}
		},
		logoutCallback() {
			this.resetInfo();
			clearToken();
		},
		async logout() {
			try {
				// logout api
				await logout();
			} finally {
				this.logoutCallback();
			}
		}
	},
	persist: piniaPersistConfig(USER_INFO)
});

export default useUserStore;
