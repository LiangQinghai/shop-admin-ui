import Mock from "mockjs";
import setupMock, { successResponseWrap } from "@/utils/setup-mock";

setupMock({
	setup() {
		Mock.mock(new RegExp("/admin/user/v1"), () => {
			const random = Mock.Random;
			const data = [];
			for (let i = 0; i < 60; i++) {
				data.push({
					id: i + 1,
					username: random.name(),
					avatar: random.dataImage(),
					nickName: random.name(),
					email: random.email(),
					mobile: Mock.mock({
						mobile: /^1([0345789])[0-9]\d{8}$/
					}).mobile,
					sex: random.boolean() ? "男" : "女",
					status: random.boolean(),
					isSupper: random.boolean(),
					description: random.string()
				});
			}
			return successResponseWrap(data, data.length);
		});
		Mock.mock(new RegExp("/admin/user/v1/disable"), () => {
			return successResponseWrap({});
		});
	}
});
