import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import { setRouteEmitter } from "@/utils/route-listener";

// 设置nprogress
NProgress.configure({ showSpinner: false });

// 导入router
// noinspection JSDeprecatedSymbols
const metaRouters = import.meta.globEager("./modules/*.ts");

// 路由表
export const routerArray: RouteRecordRaw[] = [];

Object.keys(metaRouters).forEach(item => {
	// @ts-ignore
	Object.keys(metaRouters[item]).forEach((key: any) => {
		// @ts-ignore
		routerArray.push(...metaRouters[item][key]);
	});
});

/**
 * @param path ==> 路由路径
 * @param name ==> 路由名称
 * @param redirect ==> 路由重定向
 * @param component ==> 路由组件
 * @param meta ==> 路由元信息
 * @param meta.requireAuth ==> 是否需要权限验证
 * @param meta.keepAlive ==> 是否需要缓存该路由
 * @param meta.title ==> 路由标题
 * @param meta.key	==> 路由key,用来匹配按钮权限
 * */
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: { name: "login" }
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...routerArray,
	{
		// 找不到路由重定向到404页面
		path: "/:pathMatch(.*)",
		redirect: { name: "404" }
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
});

router.beforeEach(async to => {
	// emit route change
	setRouteEmitter(to);
});
export default router;
