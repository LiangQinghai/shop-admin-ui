import { AxiosCanceler } from "@/api/helper/axiosCancel";
import router from "@/routes/router";
import NProgress from "nprogress";
import { isLogin } from "@/utils/auth";

const axiosCanceler = new AxiosCanceler();

router.beforeEach((to, from, next) => {
	NProgress.start();
	// 清除之前的请求
	axiosCanceler.removeAllPending();

	// 判断当前路由是否需要访问权限
	if (!to.matched.some(record => record.meta.requiresAuth)) return next();

	// * 判断是否有Token
	if (!isLogin()) {
		next({
			path: "/login"
		});
		NProgress.done();
		return;
	}
	next();
	// todo 权限
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
