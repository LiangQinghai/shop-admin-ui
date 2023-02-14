<template>
	<div class="login-form-wrapper">
		<div class="login-form-title">admin center</div>
		<a-form ref="loginFormRef" :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit">
			<a-form-item field="username" :rules="[{ required: true, message: '用户名不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
				<a-input v-model="userInfo.username" placeholder="请输入用户名">
					<template #prefix>
						<icon-user />
					</template>
				</a-input>
			</a-form-item>
			<a-form-item field="password" :rules="[{ required: true, message: '用户密码不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
				<a-input-password v-model="userInfo.password" placeholder="请输入用户密码" allow-clear>
					<template #prefix>
						<icon-lock />
					</template>
				</a-input-password>
			</a-form-item>
			<a-space :size="16" direction="vertical">
				<div class="login-form-password-actions">
					<a-checkbox checked="rememberPassword" :model-value="loginConfig.rememberPassword" @change="setRememberPassword"> 记住密码 </a-checkbox>
					<a-link>忘记密码</a-link>
				</div>
				<a-button type="primary" html-type="submit" long :loading="loading"> 登录 </a-button>
				<a-button type="text" long class="login-form-register-btn"> 注册 </a-button>
			</a-space>
		</a-form>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Form, Message } from "@arco-design/web-vue";
import { ValidatedError } from "@arco-design/web-vue/es/form/interface";
import { useStorage } from "@vueuse/core";
import { useUserStore } from "@/store";
import { useLoading } from "@/hooks/loading";
import { AdminUserLoginDTO } from "@/api/modules/user/types";

const router = useRouter();
const { loading, setLoading } = useLoading();
const userStore = useUserStore();
type FormInstance = InstanceType<typeof Form>;
const loginFormRef = ref<FormInstance>();

const loginConfig = useStorage("login-config", {
	rememberPassword: true,
	username: "",
	password: ""
});
const userInfo = reactive<AdminUserLoginDTO>({
	username: loginConfig.value.username,
	password: loginConfig.value.password
});

const handleSubmit = async ({ errors, values }: { errors: Record<string, ValidatedError> | undefined; values: Record<string, any> }) => {
	if (loading.value) return;
	if (!errors) {
		setLoading(true);
		try {
			await userStore.login(values as AdminUserLoginDTO);
			const { redirect, ...othersQuery } = router.currentRoute.value.query;
			Message.success("登录成功");
			await userStore.info();
			await router.push({
				name: (redirect as string) || "home",
				query: {
					...othersQuery
				}
			});
			const { rememberPassword } = loginConfig.value;
			const { username, password } = values;
			// 实际生产环境需要进行加密存储。
			// noinspection JSPrimitiveTypeWrapperUsage
			loginConfig.value.username = rememberPassword ? username : "";
			// noinspection JSPrimitiveTypeWrapperUsage
			loginConfig.value.password = rememberPassword ? password : "";
		} catch (err) {
			Message.error((err as Error).message);
		} finally {
			setLoading(false);
		}
	}
};
const setRememberPassword = (value: boolean) => {
	// noinspection JSPrimitiveTypeWrapperUsage
	loginConfig.value.rememberPassword = value;
};

// 登录校验
const checkLoginFunc = async () => {
	await userStore.info().catch(() => {});
};
onBeforeMount(() => {
	// token校验
	checkLoginFunc().then(() => {
		router.push({
			name: "home"
		});
	});
});
</script>

<style lang="less" scoped>
.login-form {
	&-wrapper {
		width: 320px;
	}

	&-title {
		color: var(--color-text-1);
		font-weight: 500;
		font-size: 24px;
		line-height: 32px;
	}

	&-sub-title {
		color: var(--color-text-3);
		font-size: 16px;
		line-height: 24px;
	}

	&-error-msg {
		height: 32px;
		color: rgb(var(--red-6));
		line-height: 32px;
	}

	&-password-actions {
		display: flex;
		justify-content: space-between;
	}

	&-register-btn {
		color: var(--color-text-3) !important;
	}
}
</style>
