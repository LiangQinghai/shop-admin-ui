<template>
	<a-menu
		:mode="topMenu.value ? 'horizontal' : 'vertical'"
		:style="{ width: '100%', height: '100%' }"
		:show-collapse-button="appStore.device !== 'mobile'"
		:auto-open="false"
		:level-indent="34"
		:onCollapse="setCollapse"
	>
		<menu-item :menu-list="menuList" />
	</a-menu>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/store";
import { computed } from "vue";
import MenuItem from "@/components/menu/menuItem.vue";
import menuList from "@/config/menu.json";

const appStore = useAppStore();
const topMenu = computed(() => appStore.topMenu);

const setCollapse = (val: boolean) => {
	if (appStore.device === "desktop") appStore.updateSettings({ menuCollapse: val });
};
</script>

<style lang="less" scoped></style>
