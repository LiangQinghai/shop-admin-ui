import { BaseDTO } from "@/api/types";

export interface RoleVO extends BaseDTO {
	name: string;
	defaultRole: boolean;
	description: string;
}
