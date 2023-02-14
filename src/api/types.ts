import * as stream from "stream";

export interface PageResult {
	size?: number;
	page?: number;
	totalPage?: number;
	totalNum?: number;
}

export interface MessageResult extends PageResult {
	code?: number;
	msg?: string;
}

export interface ResultData<T = any> extends MessageResult {
	data?: T;
}

export interface PageDTO {
	size?: number;
	page?: number;
}

export interface BaseDTO {
	id?: number;
	createTime?: string;
	updateTime?: string;
	createUser?: string;
	updateUser?: string;
}
