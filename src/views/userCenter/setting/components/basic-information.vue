<template>
	<a-form ref="formRef" :model="formData" class="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{ span: 16 }">
		<a-form-item
			field="email"
			label="邮箱"
			:rules="[
				{
					required: true,
					message: '请输入邮箱地址'
				}
			]"
		>
			<a-input v-model="formData.email" placeholder="请输入邮箱地址" />
		</a-form-item>
		<a-form-item
			field="nickname"
			label="昵称"
			:rules="[
				{
					required: true,
					message: '请输入昵称'
				}
			]"
		>
			<a-input v-model="formData.nickName" placeholder="请输入昵称" />
		</a-form-item>
		<a-form-item
			field="profile"
			label="描述"
			:rules="[
				{
					maxLength: 200,
					message: '描述最大200个字符'
				}
			]"
			row-class="keep-margin"
		>
			<a-textarea v-model="formData.description" placeholder="请输入简介" />
		</a-form-item>
		<a-form-item>
			<a-space>
				<a-button type="primary" @click="validate"> 保存 </a-button>
				<a-button type="secondary" @click="reset"> 重置 </a-button>
			</a-space>
		</a-form-item>
	</a-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FormInstance } from "@arco-design/web-vue/es/form";
import { AdminUserUpdateDTO } from "@/api/modules/user/types";
import { useUserStore } from "@/store";

const userStore = useUserStore();

const formRef = ref<FormInstance>();
const formData = ref<AdminUserUpdateDTO>({
	...userStore.getUserInfo,
	password: ""
});
const validate = async () => {
	const res = await formRef.value?.validate();
	if (!res) {
		// do some thing
		// you also can use html-type to submit
	}
};
const reset = () => {
	formRef.value?.resetFields();
};
</script>

<style scoped lang="less">
.form {
	width: 540px;
	margin: 0 auto;
}
</style>
