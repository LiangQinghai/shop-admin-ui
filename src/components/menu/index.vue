<template>
	<a-menu
		:mode="topMenu.value ? 'horizontal' : 'vertical'"
		:style="{ width: '100%', height: '100%' }"
		:show-collapse-button="appStore.device !== 'mobile'"
		:auto-open="false"
		:level-indent="34"
		:onCollapse="setCollapse"
	>
		<a-menu-item key="1">Nav1</a-menu-item>
		<a-sub-menu key="2">
			<template #title>Nav2</template>
			<a-menu-item key="2_1">sub01</a-menu-item>
			<a-menu-item key="2_2">sub02</a-menu-item>
			<a-menu-item key="2_3">sub03</a-menu-item>
		</a-sub-menu>
	</a-menu>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/store";
import { computed } from "vue";

const appStore = useAppStore();
const topMenu = computed(() => appStore.topMenu);

const setCollapse = (val: boolean) => {
	if (appStore.device === "desktop") appStore.updateSettings({ menuCollapse: val });
};
</script>

<style lang="less" scoped></style>
