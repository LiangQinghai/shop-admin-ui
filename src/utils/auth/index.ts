const TOKEN_KEY = "token";
const USER_INFO = "userInfo";

const isLogin = (): boolean => {
	return !!localStorage.getItem(TOKEN_KEY) && !!localStorage.getItem(USER_INFO);
};

const getToken = (): string | null => {
	return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string | undefined) => {
	if (!token) {
		return;
	}
	localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
	localStorage.clear();
};

export { isLogin, getToken, setToken, clearToken, TOKEN_KEY, USER_INFO };
