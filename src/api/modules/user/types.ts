import { UserState } from "@/store/modules/user/types";

export interface AdminUserLoginDTO {
	username: string;
	password: string;
}

export interface TokenVO {
	accessToken: string;
	refreshToken: string;
}

export interface AdminUserVO extends UserState {}
