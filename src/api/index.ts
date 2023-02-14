import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { ResultEnum } from "@/enums/httpEnums";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { clearToken, getToken } from "@/utils/auth";
import { checkStatus, errorResponseMessage, timeoutErrorMessage } from "@/api/helper/checkStatus";
import { ResultData } from "@/api/types";
import NProgress from "nprogress";
import router from "@/routes";

const axiosCanceler = new AxiosCanceler();

const config = {
	baseURL: import.meta.env.VITE_API_BASE_URL as string,
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true
};

class Request {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		this.service = axios.create(config);
		/**
		 * 设置请求拦截器
		 */
		this.service.interceptors.request.use(
			// @ts-ignore
			(config: AxiosRequestConfig) => {
				const token = getToken();
				axiosCanceler.addPending(config);
				// 开启全局loading
				config.headers!.noLoading || NProgress.start();
				return { ...config, headers: { ...config.headers, token: token } };
			},
			(err: AxiosError) => {
				return Promise.reject(err);
			}
		);
		// 相应拦截器
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				axiosCanceler.removePending(config);
				// 隐藏全局loading
				NProgress.done();
				if (data.code === ResultEnum.UN_AUTH) {
					errorResponseMessage(data);
					clearToken();
					// 重定向到login页面
					return Promise.reject(data);
				}
				// 全局错误信息拦截
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					errorResponseMessage(data);
					return Promise.reject(data);
				}
				return data;
			},
			async (err: AxiosError) => {
				const { response } = err;
				// 隐藏全局loading
				NProgress.done();
				// 请求超时单独判断，因为请求超时没有 response
				if (err.message.indexOf("timeout") !== -1) timeoutErrorMessage();
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// todo 跳转错误页面
				if (!window.navigator.onLine) await router.replace({ path: "/500" });
				return Promise.reject(err);
			}
		);
	}
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}

const httpClient = new Request(config);
export default httpClient;
