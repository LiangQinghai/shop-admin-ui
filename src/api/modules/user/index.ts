import {
	AdminUserChangePasswordDTO,
	AdminUserLoginDTO,
	AdminUserPageQuery,
	AdminUserRegisterDTO,
	AdminUserUpdateDTO,
	AdminUserVO,
	TokenVO,
	UserRoleUpdateDTO,
	UserRoleVo
} from "@/api/modules/user/types";
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

export const getMenuList = () => {
	return httpClient.get("/admin/user/v1/getMenuList");
};

export const page = (query: AdminUserPageQuery) => {
	return httpClient.get<AdminUserVO[]>("/admin/user/v1", query);
};

export const disableAdminUser = (ids: number[]) => {
	return httpClient.put("/admin/user/v1/disable", ids);
};

export const enableAdminUser = (ids: number[]) => {
	return httpClient.put("/admin/user/v1/enable", ids);
};

export const deleteAdminUser = (ids: number[]) => {
	return httpClient.delete("/admin.user/v1", ids);
};

export const resetPassword = (ids: number[]) => {
	return httpClient.put("/admin/user/v1/resetPassword", ids);
};

export const changePassword = (changePassword: AdminUserChangePasswordDTO) => {
	return httpClient.put("/admin/user/v1/changePassword", changePassword);
};

export const updateAdminUser = (updateAdminUser: AdminUserUpdateDTO) => {
	return httpClient.put("/admin/user/v1", updateAdminUser);
};

export const registerAdminUser = (register: AdminUserRegisterDTO) => {
	return httpClient.post("/admin/user/v1", register);
};

export const userRoles = (id: number) => {
	return httpClient.get<UserRoleVo>(`/admin/user/v1/role/${id}`);
};

export const updateUserRole = (roleUpdate: UserRoleUpdateDTO) => {
	return httpClient.put("/admin/user/v1/role", roleUpdate);
};
