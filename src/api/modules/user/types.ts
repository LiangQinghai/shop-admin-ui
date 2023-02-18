import { UserState } from "@/store/modules/user/types";
import { PageDTO } from "@/api/types";

export interface AdminUserLoginDTO {
	username: string;
	password: string;
}

export interface AdminUserRegisterDTO extends AdminUserLoginDTO {
	nickName: string;
	email?: string;
	description?: string;
	sex?: string;
	mobile?: string;
}

export interface AdminUserUpdateDTO extends AdminUserRegisterDTO {
	id: number;
}

export interface TokenVO {
	accessToken: string;
	refreshToken: string;
}

export type AdminUserVO = UserState;

export interface AdminUserPageQuery extends PageDTO {
	sex?: string;
	keyword?: string;
	status?: boolean;
}

export interface AdminUserChangePasswordDTO {
	id: number;
	oldPassword: string;
	newPassword: string;
}

// 角色
export interface UserRoleVo {
	userId: number;
	roles: UserRoleVo[];
}

export interface UserRoleUpdateDTO {
	userId: number;
	roleIds: number[];
}
