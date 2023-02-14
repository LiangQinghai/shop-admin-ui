import Mock from "mockjs";
import setupMock, { successResponseWrap } from "@/utils/setup-mock";
import { AdminUserVO, TokenVO } from "@/api/modules/user/types";
import { isLogin } from "@/utils/auth";

const tokenVo: TokenVO = {
	accessToken: "1234",
	refreshToken: "1234"
};
const userInfo: AdminUserVO = { id: 1, isSupper: true, status: true, username: "admin" };
setupMock({
	setup() {
		Mock.mock(new RegExp("/auth/manage/v1/login"), () => {
			return successResponseWrap({ ...tokenVo });
		});
		Mock.mock(new RegExp("/auth/manage/v1/userInfo"), () => {
			if (isLogin()) {
				return successResponseWrap({ ...userInfo });
			} else {
				return successResponseWrap({
					code: 401
				});
			}
		});
	}
});
