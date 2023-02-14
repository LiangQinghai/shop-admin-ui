import { AdminUserLoginDTO, AdminUserVO, TokenVO } from "@/api/modules/user/types";
import httpClient from "@/api";

export const login = (data: AdminUserLoginDTO) => {
	return httpClient.post<TokenVO>("/auth/manage/v1/login", data);
};

export const logout = () => {
	return httpClient.post("/auth/manage/v1/logout");
};

export const userInfo = () => {
	return httpClient.get<AdminUserVO>("/auth/manage/v1/userInfo");
};
