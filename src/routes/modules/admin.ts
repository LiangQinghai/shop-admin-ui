import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routes/constant";

// admin页面模块
const adminRouter: Array<RouteRecordRaw> = [
	{
		path: "/admin",
		component: Layout,
		redirect: "/admin/user/index",
		meta: {
			title: "后台中心"
		},
		children: [
			{
				path: "/admin/user/index",
				name: "adminUser",
				component: () => import("@/views/admin/user/index.vue"),
				meta: {
					keepAlive: false,
					requiresAuth: true,
					title: "后台管理",
					key: "adminUser"
				}
			}
		]
	}
];

export default adminRouter;
