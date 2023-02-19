import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routes/constant";

// userCenter页面模块
const userCenterRouter: Array<RouteRecordRaw> = [
	{
		path: "/userCenter",
		component: Layout,
		redirect: "/admin/user/index",
		meta: {
			title: "个人中心"
		},
		children: [
			{
				path: "/userCenter/setting/index",
				name: "userCenterSetting",
				component: () => import("@/views/userCenter/setting/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "用户设置",
					key: "userCenterSetting"
				}
			}
		]
	}
];

export default userCenterRouter;
