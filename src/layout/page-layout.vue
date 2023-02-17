<template>
	<div class="container">
		<Breadcrumb v-if="showBreadcrumbItems" :items="breadcrumbItems"></Breadcrumb>
		<router-view v-slot="{ Component, route }">
			<transition name="fade" mode="out-in" appear>
				<component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />
				<keep-alive v-else :include="cacheList">
					<component :is="Component" :key="route.fullPath" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useTabBarStore } from "@/store";
import { listenerRouteChange } from "@/utils/route-listener";

const tabBarStore = useTabBarStore();

const breadcrumbItems = reactive<Array<string>>([]);
const showBreadcrumbItems = ref<boolean>(true);

const cacheList = computed(() => tabBarStore.getCacheList);
listenerRouteChange(r => {
	breadcrumbItems.length = 0;
	breadcrumbItems.push(r.meta.title as string, r.matched[0].meta.title as string);
	showBreadcrumbItems.value = r.name !== "home";
});
</script>

<style scoped lang="less">
.container {
	padding: 0 20px 20px 20px;
	height: calc(100% - 40px);
	:deep(.content) {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		text-align: center;
		background-color: var(--color-bg-1);
		border-radius: 4px;
	}
}
</style>
