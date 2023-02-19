<template>
	<div>
		<a-row style="margin-bottom: 16px">
			<a-col :span="24">
				<UserPanel />
			</a-col>
		</a-row>
		<a-row class="wrapper">
			<a-col :span="24">
				<a-tabs default-active-key="1" type="rounded">
					<a-tab-pane key="1" title="基础信息">
						<BasicInformation />
					</a-tab-pane>
				</a-tabs>
			</a-col>
		</a-row>
	</div>
</template>
<script setup lang="ts">
import UserPanel from "@/views/userCenter/setting/components/user-panel.vue";
import BasicInformation from "@/views/userCenter/setting/components/basic-information.vue";
</script>
<style scoped lang="less">
.wrapper {
	padding: 20px 0 0 20px;
	min-height: 580px;
	background-color: var(--color-bg-2);
	border-radius: 4px;
}

:deep(.section-title) {
	margin-top: 0;
	margin-bottom: 16px;
}
</style>
